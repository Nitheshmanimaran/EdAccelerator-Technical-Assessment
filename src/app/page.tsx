"use client";

import { useEffect, useMemo, useState } from "react";
import { ReadingPanel } from "@/components/ReadingPanel";
import { QuestionPanel } from "@/components/QuestionPanel";
import { ResultsPanel } from "@/components/ResultsPanel";
import { StartPanel } from "@/components/StartPanel";
import { chunkPassage, estimateTotalMinutes } from "@/lib/chunk";
import { defaultPassage, passages, type Passage } from "@/lib/passage";
import { readingModes, type ReadingMode } from "@/lib/ui";
import type { GradedAnswer, Question } from "@/lib/types";
import { fallbackQuestions } from "@/lib/fallbackQuestions";
import { scoreAnswerLocal } from "@/lib/grade";

const DEFAULT_COUNT = 5;

type Phase = "start" | "practice" | "results";

type GenerationSource = "openai" | "fallback" | "";

type PassageSource = "library" | "ai";

type PassageResponse = {
  passage: Passage;
  source?: PassageSource;
  reason?: "missing_key" | "invalid_json" | "invalid_schema" | "openai_error";
  detail?: string;
  model?: string;
};

const buildLocalGrade = (question: Question, answer: string): GradedAnswer => {
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

export default function Home() {
  const [mode, setMode] = useState<ReadingMode>("focus");
  const [phase, setPhase] = useState<Phase>("start");
  const [currentChunk, setCurrentChunk] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [answers, setAnswers] = useState<Record<string, GradedAnswer>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGrading, setIsGrading] = useState(false);
  const [questionSource, setQuestionSource] = useState<GenerationSource>("");
  const [currentPassage, setCurrentPassage] = useState<Passage>(defaultPassage);
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [isGeneratingPassage, setIsGeneratingPassage] = useState(false);

  const chunks = useMemo(
    () => chunkPassage(currentPassage.text, readingModes[mode].sentencesPerChunk),
    [currentPassage.text, mode]
  );

  const totalMinutes = useMemo(
    () => estimateTotalMinutes(currentPassage.text),
    [currentPassage.text]
  );

  useEffect(() => {
    setCurrentChunk(0);
  }, [mode, currentPassage.id]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const isTyping =
        tag === "input" ||
        tag === "textarea" ||
        target?.isContentEditable;
      if (isTyping) return;

      if (event.key === "ArrowRight") {
        setCurrentChunk((prev) => Math.min(prev + 1, chunks.length - 1));
      }
      if (event.key === "ArrowLeft") {
        setCurrentChunk((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [chunks.length]);

  const resetSession = () => {
    setPhase("start");
    setQuestions([]);
    setAnswers({});
    setDrafts({});
    setCurrentQuestionIndex(0);
    setQuestionSource("");
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passage: currentPassage.text,
          count: DEFAULT_COUNT
        })
      });

      if (!response.ok) {
        throw new Error("Unable to generate questions");
      }

      const data = (await response.json()) as {
        questions?: Question[];
        source?: GenerationSource;
      };

      const nextQuestions = data.questions?.length
        ? data.questions
        : fallbackQuestions;
      setQuestions(nextQuestions);
      setQuestionSource(data.source ?? "fallback");
      setPhase("practice");
      setCurrentQuestionIndex(0);
      setAnswers({});
      setDrafts({});
    } catch (error) {
      setQuestions(fallbackQuestions);
      setQuestionSource("fallback");
      setPhase("practice");
      setCurrentQuestionIndex(0);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNextPassage = () => {
    const nextIndex = (currentPassageIndex + 1) % passages.length;
    setCurrentPassageIndex(nextIndex);
    setCurrentPassage(passages[nextIndex]);
    setCurrentChunk(0);
    resetSession();
  };

  const handleGeneratePassage = async () => {
    setIsGeneratingPassage(true);
    try {
      const response = await fetch("/api/passage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      });

      if (!response.ok) {
        throw new Error("Unable to generate passage");
      }

      const data = (await response.json()) as PassageResponse;
      if (!data?.passage) {
        throw new Error("Missing passage");
      }
      setCurrentPassage(data.passage);
      setCurrentChunk(0);
      resetSession();
    } catch (error) {
      handleNextPassage();
    } finally {
      setIsGeneratingPassage(false);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentDraft = currentQuestion
    ? drafts[currentQuestion.id] ?? ""
    : "";
  const currentGrade = currentQuestion
    ? answers[currentQuestion.id]
    : undefined;

  const handleDraftChange = (value: string) => {
    if (!currentQuestion) return;
    setDrafts((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleSubmitAnswer = async () => {
    if (!currentQuestion || !currentDraft.trim()) return;
    setIsGrading(true);
    try {
      const response = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passage: currentPassage.text,
          question: currentQuestion,
          answer: currentDraft
        })
      });

      if (!response.ok) {
        throw new Error("Unable to grade answer");
      }

      const data = (await response.json()) as GradedAnswer;
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: data }));
    } catch (error) {
      const fallback = buildLocalGrade(currentQuestion, currentDraft);
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: fallback }));
    } finally {
      setIsGrading(false);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex >= questions.length - 1) {
      setPhase("results");
      return;
    }
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleRestart = () => {
    resetSession();
  };

  return (
    <main className="px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-ink-400">
              EdAccelerator Lab
            </p>
            <h1 className="font-serif text-2xl text-ink-800 sm:text-3xl">
              Comprehension Studio
            </h1>
          </div>
        </header>

        <ReadingPanel
          title={currentPassage.title}
          subtitle={currentPassage.subtitle}
          chunks={chunks}
          currentChunk={currentChunk}
          onChunkChange={setCurrentChunk}
          mode={mode}
          onModeChange={setMode}
          totalMinutes={totalMinutes}
          onNextPassage={handleNextPassage}
          onGeneratePassage={handleGeneratePassage}
          isGeneratingPassage={isGeneratingPassage}
        />

        <div className="flex w-full flex-col gap-6">
          {phase === "start" && (
            <StartPanel
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              mode={mode}
            />
          )}

          {phase === "practice" && currentQuestion && (
            <QuestionPanel
              questions={questions}
              currentIndex={currentQuestionIndex}
              answerDraft={currentDraft}
              onDraftChange={handleDraftChange}
              onSubmit={handleSubmitAnswer}
              onPrevious={handlePrevious}
              onNext={handleNext}
              isGrading={isGrading}
              gradedAnswer={currentGrade}
            />
          )}

          {phase === "results" && (
            <ResultsPanel
              questions={questions}
              graded={answers}
              onRestart={handleRestart}
            />
          )}
        </div>
      </div>
    </main>
  );
}
