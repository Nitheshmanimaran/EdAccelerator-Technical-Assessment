import type { Question } from "./types";

export const fallbackQuestions: Question[] = [
  {
    id: "q1",
    type: "Inference",
    difficulty: "medium",
    prompt:
      "Why did the project shift from simply planting trees to building a broader system?",
    idealAnswer:
      "Because the team learned the trees were failing due to soil loss and lack of watering, so they needed infrastructure and community support that made trees survive.",
    rubric: [
      "Mentions that trees were not surviving or failing",
      "Explains at least one cause (soil washed away, lack of watering, long work shifts)",
      "Shows that the solution expanded to include systems or support"
    ],
    evidenceHint:
      "The second paragraph explains why trees failed and how the plan expanded."
  },
  {
    id: "q2",
    type: "Cause and effect",
    difficulty: "easy",
    prompt:
      "What evidence linked heat to health outcomes in the East District?",
    idealAnswer:
      "A nurse compared emergency room logs with temperature data and saw the hottest blocks sent more patients, especially older adults.",
    rubric: [
      "Mentions emergency room logs and temperature data",
      "Connects hottest blocks to more patients",
      "Includes the idea that older adults were especially affected"
    ],
    evidenceHint: "Look at the end of the first paragraph."
  },
  {
    id: "q3",
    type: "Sequence",
    difficulty: "medium",
    prompt:
      "Describe the steps the group took to build trust with residents.",
    idealAnswer:
      "They mapped heat severity, invited neighbors to rank difficult areas, and built small demonstrations like shaded corners and misting poles so people could feel the difference.",
    rubric: [
      "References the heat map or street-by-street map",
      "Mentions neighbor input or ranking",
      "Mentions the small demonstrations that showed cooling"
    ],
    evidenceHint: "The third paragraph lists the trust-building steps."
  },
  {
    id: "q4",
    type: "Main idea",
    difficulty: "hard",
    prompt:
      "What is the central lesson of the passage, and how is it different from a simple solution?",
    idealAnswer:
      "The main lesson is that lasting change came from shared responsibility and systems, not just more trees. The community-designed network made the trees survive and changed how people responded to heat.",
    rubric: [
      "States the main lesson as shared responsibility or system design",
      "Contrasts it with a simple tree-count solution",
      "Connects the lesson to outcomes in the final paragraph"
    ],
    evidenceHint: "See the final paragraph about the lesson beyond trees."
  },
  {
    id: "q5",
    type: "Perspective",
    difficulty: "medium",
    prompt:
      "From the community group's point of view, why was the pilot area intentionally chosen rather than random?",
    idealAnswer:
      "They designed the pilot around how people moved through their day, focusing on the most exhausting and unsafe routes so the changes would matter and be felt.",
    rubric: [
      "Mentions the pilot was based on movement or daily routes",
      "Connects selection to safety or exhaustion",
      "Shows that the choice was intentional and community-informed"
    ],
    evidenceHint: "The third paragraph explains why the pilot area was not random."
  }
];
