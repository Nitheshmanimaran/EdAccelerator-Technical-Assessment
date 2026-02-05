import { NextResponse } from "next/server";
import { z } from "zod";
import { hasOpenAIKey, openAIChat } from "@/lib/openai";
import { scoreAnswerLocal } from "@/lib/grade";
import type { Question } from "@/lib/types";

const RequestSchema = z.object({
  passage: z.string().min(1),
  question: z.object({
    id: z.string(),
    type: z.string(),
    difficulty: z.enum(["easy", "medium", "hard"]),
    prompt: z.string(),
    idealAnswer: z.string(),
    rubric: z.array(z.string()),
    evidenceHint: z.string()
  }),
  answer: z.string().min(1)
});

const GradeSchema = z.object({
  correct: z.boolean(),
  score: z.number().min(0).max(1),
  feedback: z.string().min(5),
  modelAnswer: z.string().min(5),
  evidence: z.string().min(5)
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

const localGrade = (question: Question, answer: string) => {
  const local = scoreAnswerLocal(answer, question.idealAnswer, question.rubric);
  return {
    id: question.id,
    answer,
    correct: local.correct,
    score: local.score,
    feedback: local.feedback,
    modelAnswer: question.idealAnswer,
    evidence: question.evidenceHint
  };
};

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = RequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { passage, question, answer } = parsed.data;

  if (!hasOpenAIKey()) {
    return NextResponse.json(localGrade(question, answer));
  }

  const systemPrompt =
    "You are a rigorous but encouraging reading comprehension coach. Score the student answer using the rubric and the passage. Provide brief, actionable feedback that helps the student improve.";

  const userPrompt = `Passage:\n${passage}\n\nQuestion:\n${question.prompt}\n\nIdeal answer:\n${question.idealAnswer}\n\nRubric:\n- ${question.rubric.join("\n- ")}\n\nStudent answer:\n${answer}\n\nReturn JSON only with this shape:\n{\n  \"correct\": true | false,\n  \"score\": 0-1,\n  \"feedback\": \"One short paragraph with Strength: ... Missing: ... Next step: ...\",\n  \"modelAnswer\": \"2-3 sentence ideal answer\",\n  \"evidence\": \"Short hint of where to look in the passage\"\n}\n\nRules:\n- Use plain ASCII.\n- Score reflects rubric alignment.\n- Keep feedback concise and actionable.\n- Output JSON only, no markdown.\n`;

  try {
    const model =
      process.env.OPENAI_GRADER_MODEL ?? process.env.OPENAI_MODEL ?? "gpt-4.1-mini";
    const content = await openAIChat({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.2,
      responseFormat: { type: "json_object" }
    });

    const jsonBlock = extractJson(content);
    if (!jsonBlock) {
      return NextResponse.json(localGrade(question, answer));
    }

    const parsedJson = safeJsonParse(jsonBlock);
    if (!parsedJson) {
      return NextResponse.json(localGrade(question, answer));
    }
    const validated = GradeSchema.safeParse(parsedJson);
    if (!validated.success) {
      return NextResponse.json(localGrade(question, answer));
    }

    return NextResponse.json({
      id: question.id,
      answer,
      ...validated.data
    });
  } catch (error) {
    return NextResponse.json(localGrade(question, answer));
  }
}
