const STOPWORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "but",
  "if",
  "then",
  "so",
  "of",
  "to",
  "in",
  "on",
  "for",
  "with",
  "at",
  "by",
  "from",
  "that",
  "this",
  "it",
  "as",
  "was",
  "were",
  "are",
  "is",
  "be",
  "been",
  "being",
  "they",
  "their",
  "them",
  "he",
  "she",
  "we",
  "you",
  "your",
  "i"
]);

const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !STOPWORDS.has(word));

const clamp = (value: number, min = 0, max = 1) =>
  Math.max(min, Math.min(max, value));

const shorten = (text: string, max = 90) =>
  text.length > max ? `${text.slice(0, max - 3)}...` : text;

export const scoreAnswerLocal = (
  answer: string,
  idealAnswer: string,
  rubric: string[] = []
) => {
  const answerTokens = new Set(normalize(answer));
  const idealTokens = normalize(idealAnswer);

  if (!idealTokens.length) {
    return {
      score: 0,
      correct: false,
      feedback: "Unable to score this answer locally.",
      modelAnswer: idealAnswer,
      evidence: "Review the passage and focus on the core causes and outcomes."
    };
  }

  let overlap = 0;
  idealTokens.forEach((token) => {
    if (answerTokens.has(token)) {
      overlap += 1;
    }
  });

  const overlapScore = overlap / idealTokens.length;
  const rubricScores = rubric.map((item) => {
    const tokens = normalize(item);
    if (!tokens.length) return 0;
    const matched = tokens.filter((token) => answerTokens.has(token)).length;
    return matched / tokens.length;
  });

  const rubricCoverage = rubricScores.length
    ? rubricScores.reduce((sum, value) => sum + value, 0) / rubricScores.length
    : 0;

  const score = clamp(overlapScore * 0.55 + rubricCoverage * 0.45);
  const correct = score >= 0.6 && answer.trim().length > 25;

  const strengths = rubric
    .filter((_, index) => (rubricScores[index] ?? 0) >= 0.6)
    .slice(0, 2)
    .map((item) => shorten(item));

  const gaps = rubric
    .filter((_, index) => (rubricScores[index] ?? 0) < 0.5)
    .slice(0, 2)
    .map((item) => shorten(item));

  const feedbackParts = [];
  if (strengths.length) {
    feedbackParts.push(`Strong: ${strengths.join("; ")}.`);
  }
  if (gaps.length) {
    feedbackParts.push(`Add: ${gaps.join("; ")}.`);
  }
  if (answer.trim().length < 25) {
    feedbackParts.push("Expand with 2-3 complete sentences.");
  }

  const feedback = feedbackParts.length
    ? feedbackParts.join(" ")
    : "Good start. Add a concrete detail from the passage.";

  return {
    score,
    correct,
    feedback,
    modelAnswer: idealAnswer,
    evidence: "Revisit the paragraph that explains the cause and the system-level response."
  };
};
