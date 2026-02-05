# Comprehension Studio

A next-generation reading comprehension interface built for the EdAccelerator English Program. The experience breaks passages into guided sections, requires typed responses, and uses AI to generate and grade evidence-based questions.

## Links
- **Live demo:** _add Vercel URL_
- **Repository:** _add GitHub URL_

## Highlights
- **Sectioned reading** with clear navigation and keyboard arrows.
- **Typed responses only** to eliminate guessing.
- **Adaptive pacing** via Focus vs Flow modes (3-4 vs 5-6 sentences per section).
- **Optional AI passage generation** plus a curated library fallback.
- **AI-generated questions** with rubric-aligned grading and feedback.

## Requirements Met
- Next.js 14+ (App Router), TypeScript, Tailwind CSS
- AI-generated comprehension questions (OpenAI)
- Correct/incorrect tracking and final score
- Works on mobile and desktop

## Interpretation of Feedback
- “Seeing the entire passage all at once is annoying.” → Passage is split into smaller sections with navigation.
- “Multiple choice is too easy.” → Students type full answers; no MCQ.
- “I forget what I read.” → Feedback appears immediately beneath the answer to reinforce learning.
- “Explanations are skipped.” → Feedback is concise, actionable, and placed in-context.
- “Feels like a test.” → Coaching tone, pacing options, and supportive guidance.
- “Need to re-read quickly.” → Section navigator and keyboard arrows speed re-reading.
- “Different reading speeds.” → Focus/Flow modes adjust section length and pacing.

## AI Question Generation Approach
- `POST /api/generate` sends the passage to OpenAI with a strict JSON-only prompt.
- Questions are varied by type and difficulty, and grounded in passage evidence.
- Zod validates responses; fallback questions are used if parsing fails.

## Optional AI Passage Generation
- `POST /api/passage` creates fresh passages (title, subtitle, text).
- If AI output fails, a curated library passage is used.
- Prompt avoids repeating the same theme and encourages diverse topics.

## AI Grading Approach
- `POST /api/grade` evaluates student answers against the ideal answer + rubric.
- Returns correctness, a score, feedback, and a model answer.
- Local grading fallback uses rubric coverage + keyword overlap.

## Key Decisions
- **Single-column flow:** passage first, then questions for a clean reading-to-answer rhythm.
- **Section sizing:** Focus mode for slower readers, Flow mode for faster readers.
- **Rubric-first feedback:** guidance is tied to what strong answers must include.
- **Strict JSON contracts:** robust handling of model output.

## Learning Experience Focus
- **Active recall:** typed responses reduce guessing and force retrieval.
- **Immediate coaching:** feedback sits directly beneath the answer for reflection.
- **Clarity of expectations:** rubrics and model answers show what quality looks like.
- **Pacing control:** Focus vs Flow keeps the experience comfortable for different readers.

## Running Locally
```bash
npm install
npm run dev
```

Create a `.env.local` file:
```
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=your_model_here
OPENAI_GRADER_MODEL=your_model_here
OPENAI_BASE_URL=https://api.openai.com/v1
```

## Time Spent
- _Update with your actual time spent (e.g., 6-8 hours)._ 

---

### Project Structure
```
src/
  app/
    api/
      generate/route.ts
      grade/route.ts
      passage/route.ts
    layout.tsx
    page.tsx
    globals.css
  components/
    ReadingPanel.tsx
    StartPanel.tsx
    QuestionPanel.tsx
    ResultsPanel.tsx
  lib/
    chunk.ts
    fallbackQuestions.ts
    grade.ts
    openai.ts
    passage.ts
    types.ts
    ui.ts
```
