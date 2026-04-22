import { NextResponse } from "next/server";

import { PORTS } from "@/lib/ports";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type OpenAITextContent = {
  type?: string;
  text?: string;
};

type OpenAIOutputItem = {
  content?: OpenAITextContent[];
};

const portByName = new Map(PORTS.map((port) => [port.name, port] as const));
const MAX_QUESTION_LENGTH = 700;
const MAX_HISTORY_ITEMS = 6;
const MODEL = process.env.OPENAI_MODEL ?? "gpt-5.4";
const PORT_CONCIERGE_PROMPT = [
  "You are the Excursions Greece shore-side concierge: a seasoned local destination specialist for cruise guests, travel advisors, and operations teams.",
  "Your job is to make each Greek port feel easy to understand and exciting to visit. Give answers with taste, confidence, and practical judgment, not generic brochure copy.",
  "Stay anchored to the selected port, but feel free to discuss nearby towns, beaches, archaeological sites, food stops, viewpoints, transfer realities, guest profiles, and route tradeoffs.",
  "Use the site-provided port fact as trusted context, then add helpful general destination knowledge when it improves the answer.",
  "When the question is broad, offer a compact recommendation with a clear point of view: best first choice, why it works, timing shape, and one alternate for a different mood.",
  "When the guest has a constraint, tailor the answer to it: families, mobility, heat, tenders, luxury/private touring, history lovers, beach time, short calls, or first-time Greece visitors.",
  "Write naturally, like a sharp local host. Prefer concrete details, sensory cues, and useful ranges over stiff caveats.",
  "Do not invent live availability, exact prices, current opening hours, ship schedules, ticket guarantees, or legal/medical assurances. For those, say the Excursions Greece team can confirm the live details.",
  "Keep most replies around 120-220 words. Use bullets only when they make the answer easier to scan.",
].join(" ");

const normalizeText = (value: unknown, maxLength: number) => {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
};

const isChatMessage = (value: unknown): value is ChatMessage => {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<ChatMessage>;
  return (
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string" &&
    candidate.content.trim().length > 0
  );
};

const sanitizeHistory = (value: unknown): ChatMessage[] => {
  if (!Array.isArray(value)) return [];

  return value
    .filter(isChatMessage)
    .slice(-MAX_HISTORY_ITEMS)
    .map((message) => ({
      role: message.role,
      content: normalizeText(message.content, 900),
    }));
};

const buildInput = ({
  history,
  port,
  question,
}: {
  history: ChatMessage[];
  port: (typeof PORTS)[number];
  question: string;
}) => {
  const transcript = history
    .map((message) => `${message.role === "user" ? "Guest" : "Concierge"}: ${message.content}`)
    .join("\n");

  return [
    `Selected port: ${port.name}`,
    `Region: ${port.region}`,
    `Category: ${port.category}`,
    `Known site fact: ${port.fact}`,
    transcript ? `Recent conversation:\n${transcript}` : "",
    `Guest question: ${question}`,
  ]
    .filter(Boolean)
    .join("\n\n");
};

const getOutputText = (payload: unknown) => {
  if (!payload || typeof payload !== "object") return "";

  const candidate = payload as {
    output_text?: unknown;
    output?: OpenAIOutputItem[];
  };

  if (typeof candidate.output_text === "string") {
    return candidate.output_text.trim();
  }

  return (candidate.output ?? [])
    .flatMap((item) => item.content ?? [])
    .map((content) => content.text)
    .filter((text): text is string => typeof text === "string")
    .join("\n")
    .trim();
};

const getOpenAIErrorSummary = (payload: unknown) => {
  if (!payload || typeof payload !== "object") return null;

  const candidate = payload as {
    error?: {
      code?: unknown;
      message?: unknown;
      type?: unknown;
    };
  };

  if (!candidate.error) return null;

  return {
    code:
      typeof candidate.error.code === "string" ? candidate.error.code : null,
    message:
      typeof candidate.error.message === "string"
        ? candidate.error.message
        : null,
    type:
      typeof candidate.error.type === "string" ? candidate.error.type : null,
  };
};

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Send a valid chat request." },
      { status: 400 },
    );
  }

  const payload = body as {
    history?: unknown;
    portName?: unknown;
    question?: unknown;
  };
  const portName = normalizeText(payload.portName, 120);
  const question = normalizeText(payload.question, MAX_QUESTION_LENGTH);
  const port = portByName.get(portName);

  if (!port || question.length < 2) {
    return NextResponse.json(
      { message: "Choose a port and ask a question." },
      { status: 400 },
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { message: "The port concierge is not configured yet." },
      { status: 500 },
    );
  }

  try {
    const openAIResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        instructions: PORT_CONCIERGE_PROMPT,
        input: buildInput({
          history: sanitizeHistory(payload.history),
          port,
          question,
        }),
        max_output_tokens: 700,
        reasoning: {
          effort: "low",
        },
      }),
    });

    const openAIPayload = (await openAIResponse.json().catch(() => null)) as unknown;

    if (!openAIResponse.ok) {
      console.error("OpenAI port chat request failed", {
        status: openAIResponse.status,
        error: getOpenAIErrorSummary(openAIPayload),
      });

      return NextResponse.json(
        { message: "The port concierge is unavailable right now." },
        { status: 502 },
      );
    }

    const answer = getOutputText(openAIPayload);

    if (!answer) {
      return NextResponse.json(
        { message: "The port concierge returned an empty response." },
        { status: 502 },
      );
    }

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Port chat route failed", error);

    return NextResponse.json(
      { message: "The port concierge is unavailable right now." },
      { status: 502 },
    );
  }
}
