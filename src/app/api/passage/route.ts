import { NextResponse } from "next/server";
import { z } from "zod";
import { hasOpenAIKey, openAIChat } from "@/lib/openai";
import { passages } from "@/lib/passage";

const RequestSchema = z.object({
  topic: z.string().min(3).max(120).optional()
});

const PassageSchema = z.object({
  id: z.string().min(3),
  title: z.string().min(5),
  subtitle: z.string().min(5),
  text: z.string().min(200)
});

const ResponseSchema = z.object({
  passage: PassageSchema
});

const extractJson = (content: string) => {
  const first = content.indexOf("{");
  const last = content.lastIndexOf("}");
  if (first === -1 || last === -1) return null;
  return content.slice(first, last + 1);
};

const safeJsonParse = (content: string) => {
  try {
    return JSON.parse(content) as unknown;
  } catch (error) {
    const sanitized = content.replace(/[\u0000-\u001F]/g, " ");
    try {
      return JSON.parse(sanitized) as unknown;
    } catch {
      return null;
    }
  }
};

const pickFallback = () =>
  passages[Math.floor(Math.random() * passages.length)];

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = RequestSchema.safeParse(body);
  const topic = parsed.success ? parsed.data.topic : undefined;

  if (!hasOpenAIKey()) {
    return NextResponse.json({
      passage: pickFallback(),
      source: "library",
      reason: "missing_key"
    });
  }

  const systemPrompt =
    "You are an expert educator writing a fresh reading passage for comprehension practice.";

  const userPrompt = `Create a new passage between 330 and 450 words.\n\nTopic: ${
    topic ??
    "Pick a fresh theme each time from nature, science in daily life, personal decision-making, art and creativity, sports psychology, simple economics, travel observations, or historical lessons. Avoid repeating community, neighborhood, or city-improvement themes."
  }\n\nReturn JSON only with this shape:\n{\n  \"passage\": {\n    \"id\": \"short-slug\",\n    \"title\": \"Title\",\n    \"subtitle\": \"Subtitle\",\n    \"text\": \"Paragraphs separated by blank lines\"\n  }\n}\n\nRules:\n- Use plain ASCII only.\n- 3 to 4 paragraphs.\n- No bullet points.\n- Avoid proper nouns that require external knowledge.\n- Output JSON only, no markdown.\n`;

  try {
    const model = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";
    const content = await openAIChat({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      responseFormat: { type: "json_object" }
    });

    const jsonBlock = extractJson(content);
    if (!jsonBlock) {
      return NextResponse.json({
        passage: pickFallback(),
        source: "library",
        reason: "invalid_json"
      });
    }

    const parsedJson = safeJsonParse(jsonBlock);
    if (!parsedJson) {
      return NextResponse.json({
        passage: pickFallback(),
        source: "library",
        reason: "invalid_json"
      });
    }
    const validated = ResponseSchema.safeParse(parsedJson);

    if (!validated.success) {
      return NextResponse.json({
        passage: pickFallback(),
        source: "library",
        reason: "invalid_schema"
      });
    }

    return NextResponse.json({
      passage: validated.data.passage,
      source: "ai",
      model
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown OpenAI error";
    return NextResponse.json({
      passage: pickFallback(),
      source: "library",
      reason: "openai_error",
      detail: message
    });
  }
}
