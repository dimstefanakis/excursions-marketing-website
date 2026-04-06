import { NextResponse } from "next/server";

import { FORM_PAGE_CONFIG, type FormKey } from "@/lib/form-config";

const AIRTABLE_BASE_URL = "https://api.airtable.com/v0";
const AIRTABLE_CONTENT_URL = "https://content.airtable.com/v0";
const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;

function getAirtableEnv() {
  const baseId = process.env.AIRTABLE_BASE_ID;
  const token = process.env.AIRTABLE_API_TOKEN;

  if (!baseId || !token) {
    throw new Error("Missing AIRTABLE_BASE_ID or AIRTABLE_API_TOKEN");
  }

  return { baseId, token };
}

async function airtableRequest<T>(
  url: string,
  init: RequestInit,
  token: string,
): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Airtable request failed (${response.status}): ${errorText}`);
  }

  return response.json() as Promise<T>;
}

type AirtableRecordCreateResponse = {
  records: Array<{
    id: string;
  }>;
};

export async function handleFormSubmission(formKey: FormKey, request: Request) {
  try {
    const { baseId, token } = getAirtableEnv();
    const config = FORM_PAGE_CONFIG[formKey].airtable;
    const formData = await request.formData();

    const stringValues = Object.keys(config.fieldMap).reduce<Record<string, string>>(
      (acc, key) => {
        const rawValue = formData.get(key);
        acc[key] = typeof rawValue === "string" ? rawValue.trim() : "";
        return acc;
      },
      {},
    );

    const missingField = config.required.find((key) => {
      if (key === "cvUpload") {
        const rawFile = formData.get(key);
        return !(rawFile instanceof File) || rawFile.size === 0;
      }

      return !stringValues[key];
    });

    if (missingField) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 },
      );
    }

    const fields = Object.entries(config.fieldMap).reduce<Record<string, string>>(
      (acc, [key, airtableField]) => {
        const value = stringValues[key];
        if (value) {
          acc[airtableField] = value;
        }
        return acc;
      },
      {},
    );

    fields["Submitted At"] = new Date().toISOString();

    const createResponse = await airtableRequest<AirtableRecordCreateResponse>(
      `${AIRTABLE_BASE_URL}/${baseId}/${encodeURIComponent(config.tableName)}`,
      {
        method: "POST",
        body: JSON.stringify({
          typecast: true,
          records: [{ fields }],
        }),
      },
      token,
    );

    const recordId = createResponse.records[0]?.id;
    if (!recordId) {
      throw new Error("Airtable did not return a record ID.");
    }

    if (config.attachmentField) {
      const rawFile = formData.get("cvUpload");
      if (rawFile instanceof File && rawFile.size > 0) {
        if (rawFile.size > MAX_ATTACHMENT_BYTES) {
          return NextResponse.json(
            { error: "CV uploads must be 5 MB or smaller." },
            { status: 400 },
          );
        }

        const fileBuffer = Buffer.from(await rawFile.arrayBuffer());
        const contentType = rawFile.type || "application/octet-stream";

        await airtableRequest(
          `${AIRTABLE_CONTENT_URL}/${baseId}/${recordId}/${encodeURIComponent(config.attachmentField)}/uploadAttachment`,
          {
            method: "POST",
            body: JSON.stringify({
              contentType,
              filename: rawFile.name,
              file: fileBuffer.toString("base64"),
            }),
          },
          token,
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "We couldn't submit your form right now. Please try again shortly." },
      { status: 500 },
    );
  }
}
