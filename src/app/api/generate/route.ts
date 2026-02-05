import { NextResponse } from "next/server";
import { z } from "zod";
import { fallbackQuestions } from "@/lib/fallbackQuestions";
import { hasOpenAIKey, openAIChat } from "@/lib/openai";
import type { Question } from "@/lib/types";

const RequestSchema = z.object({
  passage: z.string().min(1),
  count: z.number().min(3).max(8).optional()
});

const QuestionSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(2),
  difficulty: z.enum(["easy", "medium", "hard"]),
  prompt: z.string().min(5),
  idealAnswer: z.string().min(5),
  rubric: z.array(z.string().min(3)).min(2).max(5),
  evidenceHint: z.string().min(5)
});

const ResponseSchema = z.object({
  questions: z.array(QuestionSchema).min(3).max(8)
});

const extractJson = (content: string) => {
  const first = content.indexOf("{");
  const last = content.lastIndexOf("}");
  if (first === -1 || last === -1) {
    return null;
  }
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

const ensureIds = (questions: Question[]) =>
  questions.map((question, index) => ({
    ...question,
    id: question.id || `q-${index + 1}`
  }));

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { questions: fallbackQuestions, source: "fallback" },
        { status: 200 }
      );
    }

    const { passage, count } = parsed.data;
    const targetCount = count ?? 5;

    if (!hasOpenAIKey()) {
      return NextResponse.json(
        { questions: fallbackQuestions, source: "fallback" },
        { status: 200 }
      );
    }

    const systemPrompt =
      "You are an expert reading comprehension coach. Generate questions that test deep understanding, not surface recall. Each question must be answerable only from the passage.";

    const userPrompt = `Passage:\n${passage}\n\nReturn JSON only with this shape:\n{\n  \"questions\": [\n    {\n      \"id\": \"q1\",\n      \"type\": \"Inference | Main idea | Cause and effect | Sequence | Perspective | Vocabulary in context | Synthesis\",\n      \"difficulty\": \"easy | medium | hard\",\n      \"prompt\": \"Question text\",\n      \"idealAnswer\": \"1-3 sentence answer\",\n      \"rubric\": [\"short criteria bullets\"],\n      \"evidenceHint\": \"Short hint describing where in the passage to look. No long quotes.\"\n    }\n  ]\n}\n\nRules:\n- Provide ${targetCount} questions.\n- Mix question types and difficulty.\n- Avoid yes/no questions.\n- Ensure evidenceHint is short and points to a paragraph or idea.\n- Use plain ASCII.\n- Output JSON only, no markdown.\n`;

    const model = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";
    const content = await openAIChat({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.4,
      responseFormat: { type: "json_object" }
    });

    const jsonBlock = extractJson(content);
    if (!jsonBlock) {
      return NextResponse.json(
        { questions: fallbackQuestions, source: "fallback" },
        { status: 200 }
      );
    }

    const parsedJson = safeJsonParse(jsonBlock);
    if (!parsedJson) {
      return NextResponse.json(
        { questions: fallbackQuestions, source: "fallback" },
        { status: 200 }
      );
    }
    const validated = ResponseSchema.safeParse(parsedJson);

    if (!validated.success) {
      return NextResponse.json(
        { questions: fallbackQuestions, source: "fallback" },
        { status: 200 }
      );
    }

    const questions = ensureIds(validated.data.questions);

    return NextResponse.json(
      { questions, source: "openai" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { questions: fallbackQuestions, source: "fallback" },
      { status: 200 }
    );
  }
}
