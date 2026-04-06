import { handleFormSubmission } from "@/lib/airtable";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleFormSubmission("guides", request);
}
