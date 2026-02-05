import type { ReadingMode } from "@/lib/ui";

type StartPanelProps = {
  onGenerate: () => void;
  isGenerating: boolean;
  mode: ReadingMode;
};

export function StartPanel({ onGenerate, isGenerating, mode }: StartPanelProps) {
  return (
    <section className="glass-card flex h-full flex-col gap-6 rounded-3xl p-6">
      <div className="badge">Learning Mission</div>
      <div>
        <h2 className="font-serif text-3xl text-ink-800">
          Turn reading into understanding
        </h2>
        <p className="mt-2 text-sm text-ink-500">
          You are in {mode === "focus" ? "Focus" : "Flow"} mode. The session
          will adapt section size and pacing to match that choice.
        </p>
      </div>
      <button
        type="button"
        onClick={onGenerate}
        disabled={isGenerating}
        className="mt-auto w-full rounded-2xl bg-ink-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-ink-800 disabled:cursor-not-allowed disabled:bg-ink-300"
      >
        {isGenerating ? "Generating AI questions..." : "Start the practice"}
      </button>
    </section>
  );
}
