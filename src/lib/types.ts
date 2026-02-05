export type Question = {
  id: string;
  type: string;
  difficulty: "easy" | "medium" | "hard";
  prompt: string;
  idealAnswer: string;
  rubric: string[];
  evidenceHint: string;
};

export type GradedAnswer = {
  id: string;
  answer: string;
  correct: boolean;
  score: number;
  feedback: string;
  modelAnswer: string;
  evidence: string;
};
