export type ReadingMode = "focus" | "flow";

export const readingModes: Record<ReadingMode, {
  label: string;
  description: string;
  sentencesPerChunk: { min: number; max: number };
  pace: string;
}> = {
  focus: {
    label: "Focus Mode",
    description: "Medium sections, slower pace, more reflection prompts.",
    sentencesPerChunk: { min: 3, max: 4 },
    pace: "Slow and steady"
  },
  flow: {
    label: "Flow Mode",
    description: "Longer sections, fewer stops, faster reading rhythm.",
    sentencesPerChunk: { min: 5, max: 6 },
    pace: "Faster, continuous"
  }
};
