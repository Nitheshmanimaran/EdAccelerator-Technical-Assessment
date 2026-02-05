export type PassageChunk = {
  id: string;
  index: number;
  text: string;
  sentences: string[];
  wordCount: number;
  minutes: number;
};

const WORDS_PER_MINUTE = 180;

export const splitParagraphs = (text: string): string[] =>
  text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

export const splitSentences = (paragraph: string): string[] => {
  const matches = paragraph.match(/[^.!?]+[.!?]+|[^.!?]+$/g);
  return (matches ?? []).map((sentence) => sentence.trim()).filter(Boolean);
};

const countWords = (text: string) =>
  text
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

type ChunkSize = number | { min: number; max: number };

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const getChunkSize = (sentencesPerChunk: ChunkSize, index: number) => {
  if (typeof sentencesPerChunk === "number") {
    return sentencesPerChunk;
  }
  const min = Math.max(1, sentencesPerChunk.min);
  const max = Math.max(min, sentencesPerChunk.max);
  const range = max - min + 1;
  return clamp(min + (index % range), min, max);
};

export const chunkPassage = (text: string, sentencesPerChunk: ChunkSize): PassageChunk[] => {
  const paragraphs = splitParagraphs(text);
  const chunks: PassageChunk[] = [];
  let chunkIndex = 0;

  paragraphs.forEach((paragraph) => {
    const sentences = splitSentences(paragraph);
    for (let i = 0; i < sentences.length; ) {
      const size = getChunkSize(sentencesPerChunk, chunkIndex);
      const chunkSentences = sentences.slice(i, i + size);
      const chunkText = chunkSentences.join(" ");
      const wordCount = countWords(chunkText);
      chunks.push({
        id: `chunk-${chunkIndex + 1}`,
        index: chunkIndex,
        text: chunkText,
        sentences: chunkSentences,
        wordCount,
        minutes: Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE))
      });
      chunkIndex += 1;
      i += size;
    }
  });

  const minSize =
    typeof sentencesPerChunk === "number"
      ? sentencesPerChunk
      : Math.max(1, sentencesPerChunk.min);

  if (minSize > 1 && chunks.length > 1) {
    let i = 0;
    while (i < chunks.length) {
      const current = chunks[i];
      if (current.sentences.length < minSize) {
        if (i === 0 && chunks.length > 1) {
          const next = chunks[i + 1];
          next.sentences = [...current.sentences, ...next.sentences];
          next.text = `${current.text} ${next.text}`;
          next.wordCount = countWords(next.text);
          next.minutes = Math.max(
            1,
            Math.round(next.wordCount / WORDS_PER_MINUTE)
          );
          chunks.splice(i, 1);
          continue;
        }
        if (i > 0) {
          const prev = chunks[i - 1];
          prev.sentences = [...prev.sentences, ...current.sentences];
          prev.text = `${prev.text} ${current.text}`;
          prev.wordCount = countWords(prev.text);
          prev.minutes = Math.max(
            1,
            Math.round(prev.wordCount / WORDS_PER_MINUTE)
          );
          chunks.splice(i, 1);
          continue;
        }
      }
      i += 1;
    }
  }

  chunks.forEach((chunk, index) => {
    chunk.index = index;
    chunk.id = `chunk-${index + 1}`;
  });

  return chunks;
};

export const estimateTotalMinutes = (text: string) => {
  const wordCount = countWords(text);
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
};
