"use client";

import { useEffect, useState } from "react";
import type { GradedAnswer, Question } from "@/lib/types";

type QuestionPanelProps = {
  questions: Question[];
  currentIndex: number;
  answerDraft: string;
  onDraftChange: (value: string) => void;
  onSubmit: () => void;
  onPrevious: () => void;
  onNext: () => void;
  isGrading: boolean;
  gradedAnswer?: GradedAnswer;
};

export function QuestionPanel({
  questions,
  currentIndex,
  answerDraft,
  onDraftChange,
  onSubmit,
  onPrevious,
  onNext,
  isGrading,
  gradedAnswer
}: QuestionPanelProps) {
  const question = questions[currentIndex];
  const progress = Math.round(((currentIndex + 1) / questions.length) * 100);
  const canContinue = Boolean(gradedAnswer);
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  useEffect(() => {
    setShowModelAnswer(false);
  }, [question.id]);

  return (
    <section className="glass-card flex h-full flex-col gap-6 rounded-3xl p-6">
      <header className="space-y-3">
        <div className="badge">Practice Coach</div>
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-ink-800">Comprehension Check</h2>
          <span className="text-xs font-semibold text-ink-500">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
          <div
            className="h-full bg-tide-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <div className="rounded-2xl border border-ink-100 bg-white/90 p-5 shadow-soft-lg">
        <div className="flex flex-wrap items-center gap-3 text-xs text-ink-500">
          <span className="chip">{question.type}</span>
          <span className="chip">{question.difficulty}</span>
        </div>
        <p className="mt-4 text-base font-semibold text-ink-800">
          {question.prompt}
        </p>
        <p className="mt-2 text-sm text-ink-500">
          Answer in 2-4 sentences. Use evidence from the passage.
        </p>
        <textarea
          value={answerDraft}
          onChange={(event) => onDraftChange(event.target.value)}
          rows={5}
          placeholder="Type your answer here..."
          className="mt-4 w-full rounded-2xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink-700 focus:border-tide-400 focus:outline-none"
        />
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onSubmit}
            disabled={isGrading || !answerDraft.trim()}
            className="rounded-full bg-ink-900 px-5 py-2 text-xs font-semibold text-white transition hover:bg-ink-800 disabled:cursor-not-allowed disabled:bg-ink-300"
          >
            {isGrading ? "Checking..." : "Check answer"}
          </button>
          <button
            type="button"
            onClick={onPrevious}
            disabled={currentIndex === 0}
            className="rounded-full border border-ink-200 bg-white px-5 py-2 text-xs font-semibold text-ink-600 transition hover:border-ink-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!canContinue}
            className="rounded-full bg-tide-600 px-5 py-2 text-xs font-semibold text-white transition hover:bg-tide-500 disabled:cursor-not-allowed disabled:bg-ink-300"
          >
            {currentIndex === questions.length - 1
              ? "Finish session"
              : "Next question"}
          </button>
        </div>
      </div>

      {gradedAnswer && (
        <div className="rounded-2xl border border-ink-100 bg-white/85 p-5">
          <div className="flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                gradedAnswer.correct
                  ? "bg-tide-100 text-tide-700"
                  : "bg-sun-100 text-sun-700"
              }`}
            >
              {gradedAnswer.correct ? "Correct" : "Needs work"}
            </span>
            <span className="text-xs text-ink-400">
              Score: {(gradedAnswer.score * 100).toFixed(0)}%
            </span>
          </div>
          <div className="mt-4 grid gap-3 text-sm text-ink-600">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
                Coach feedback
              </p>
              <p className="mt-1">{gradedAnswer.feedback}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
                Model answer
              </p>
              {showModelAnswer ? (
                <p className="mt-1">{gradedAnswer.modelAnswer}</p>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowModelAnswer(true)}
                  className="mt-2 rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-semibold text-ink-600 transition hover:border-ink-300"
                >
                  Reveal model answer
                </button>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
                Evidence to revisit
              </p>
              <p className="mt-1">{gradedAnswer.evidence}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
                What a strong answer includes
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-600">
                {question.rubric.map((item, index) => (
                  <li key={`${question.id}-rubric-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-ink-400">
          Tip: Re-read the passage before moving on.
        </p>
      </div>
    </section>
  );
}
