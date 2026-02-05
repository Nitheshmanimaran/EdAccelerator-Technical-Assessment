import type { GradedAnswer, Question } from "@/lib/types";

type ResultsPanelProps = {
  questions: Question[];
  graded: Record<string, GradedAnswer | undefined>;
  onRestart: () => void;
};

export function ResultsPanel({
  questions,
  graded,
  onRestart
}: ResultsPanelProps) {
  const total = questions.length;
  const correctCount = questions.filter((q) => graded[q.id]?.correct).length;
  const percent = total ? Math.round((correctCount / total) * 100) : 0;
  const missed = questions.filter((q) => !graded[q.id]?.correct);

  return (
    <section className="glass-card flex flex-col gap-6 rounded-3xl p-6">
      <header className="space-y-3">
        <div className="badge">Session Summary</div>
        <h2 className="font-serif text-3xl text-ink-800">Your learning snapshot</h2>
        <p className="text-sm text-ink-500">
          Review what stuck, and revisit the evidence for anything that did not.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-ink-100 bg-white/90 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-ink-400">
            Score
          </p>
          <p className="mt-2 text-3xl font-semibold text-ink-800">{percent}%</p>
        </div>
        <div className="rounded-2xl border border-ink-100 bg-white/90 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-ink-400">
            Correct
          </p>
          <p className="mt-2 text-3xl font-semibold text-ink-800">
            {correctCount}
          </p>
        </div>
        <div className="rounded-2xl border border-ink-100 bg-white/90 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-ink-400">
            To revisit
          </p>
          <p className="mt-2 text-3xl font-semibold text-ink-800">
            {missed.length}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white/85 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-400">
          What to do next
        </p>
        <ul className="mt-3 grid gap-2 text-sm text-ink-600">
          <li>Re-read the passage and summarize the main idea in one sentence.</li>
          <li>Highlight the evidence words that support your reasoning.</li>
          <li>Try the session again in a different reading mode.</li>
        </ul>
      </div>

      <div className="grid gap-3">
        {missed.length ? (
          missed.map((question) => (
            <div
              key={question.id}
              className="rounded-2xl border border-ink-100 bg-white/90 p-4"
            >
              <p className="text-sm font-semibold text-ink-700">
                {question.prompt}
              </p>
              <p className="mt-2 text-xs text-ink-500">
                Evidence hint: {question.evidenceHint}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-ink-100 bg-white/90 p-4 text-sm text-ink-600">
            Perfect run. Consider switching to Flow mode for a faster round.
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="mt-auto w-full rounded-2xl bg-ink-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-ink-800"
      >
        Start a new session
      </button>
    </section>
  );
}
