import { readingModes, type ReadingMode } from "@/lib/ui";
import type { PassageChunk } from "@/lib/chunk";

type ReadingPanelProps = {
  title: string;
  subtitle: string;
  chunks: PassageChunk[];
  currentChunk: number;
  onChunkChange: (index: number) => void;
  mode: ReadingMode;
  onModeChange: (mode: ReadingMode) => void;
  totalMinutes: number;
  onNextPassage: () => void;
  onGeneratePassage: () => void;
  isGeneratingPassage: boolean;
};

export function ReadingPanel({
  title,
  subtitle,
  chunks,
  currentChunk,
  onChunkChange,
  mode,
  onModeChange,
  totalMinutes,
  onNextPassage,
  onGeneratePassage,
  isGeneratingPassage
}: ReadingPanelProps) {
  return (
    <section className="glass-card flex flex-col gap-6 rounded-3xl p-6">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="badge">Reading Studio</div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-ink-500">
            <span className="chip">Estimated {totalMinutes} min read</span>
            <span className="chip">{chunks.length} sections</span>
            <span className="chip">Mode: {readingModes[mode].pace}</span>
          </div>
        </div>
        <div>
          <h1 className="font-serif text-3xl text-ink-800 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-ink-500 sm:text-base">{subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onNextPassage}
            className="rounded-full border border-ink-200 bg-white px-4 py-2 text-xs font-semibold text-ink-600 transition hover:border-ink-300"
          >
            Next passage
          </button>
          <button
            type="button"
            onClick={onGeneratePassage}
            disabled={isGeneratingPassage}
            className="rounded-full border border-ink-200 bg-white px-4 py-2 text-xs font-semibold text-ink-600 transition hover:border-ink-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isGeneratingPassage ? "Generating new passage..." : "Generate AI passage"}
          </button>
        </div>
      </header>

      <div className="rounded-2xl border border-ink-100 bg-white/80 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-400">
          Reading Mode
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {(Object.keys(readingModes) as ReadingMode[]).map((key) => {
            const option = readingModes[key];
            const active = key === mode;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onModeChange(key)}
                className={`rounded-2xl border p-4 text-left transition ${
                  active
                    ? "border-tide-500 bg-tide-100/70 shadow-glow"
                    : "border-ink-100 bg-white hover:border-ink-200"
                }`}
              >
                <div className="text-sm font-semibold text-ink-700">
                  {option.label}
                </div>
                <p className="mt-2 text-xs text-ink-500">
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-ink-600">Passage map</p>
          <span className="text-xs text-ink-400">
            Section {currentChunk + 1} of {chunks.length}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {chunks.map((chunk, index) => (
            <button
              key={chunk.id}
              type="button"
              onClick={() => onChunkChange(index)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                index === currentChunk
                  ? "border-ink-700 bg-ink-700 text-white"
                  : "border-ink-200 bg-white text-ink-600 hover:border-ink-300"
              }`}
            >
              Section {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white/90 p-5 shadow-soft-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.25em] text-ink-400">
          <span>Current section</span>
          <div className="flex items-center gap-2">
            <span>~{chunks[currentChunk]?.minutes ?? 1} min</span>
            <span className="rounded-full border border-ink-100 bg-white px-2 py-1 text-[10px] font-semibold text-ink-500">
              Use ← →
            </span>
          </div>
        </div>
        <p className="mt-4 text-base leading-relaxed text-ink-700">
          {chunks[currentChunk]?.text}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onChunkChange(Math.max(0, currentChunk - 1))}
            className="rounded-full border border-ink-200 bg-white px-4 py-2 text-xs font-semibold text-ink-600 transition hover:border-ink-300"
            disabled={currentChunk === 0}
          >
            ← Previous section
          </button>
          <button
            type="button"
            onClick={() =>
              onChunkChange(Math.min(chunks.length - 1, currentChunk + 1))
            }
            className="rounded-full border border-ink-200 bg-white px-4 py-2 text-xs font-semibold text-ink-600 transition hover:border-ink-300"
            disabled={currentChunk === chunks.length - 1}
          >
            Next section →
          </button>
        </div>
      </div>
    </section>
  );
}
