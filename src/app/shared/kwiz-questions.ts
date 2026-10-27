import { ENTRIES, Entry } from './diksyone';

/** One quiz question about a word of the dictionary. */
export interface Question {
  readonly text: string;
  readonly options: readonly string[];
  /** Index of the right answer in `options`. */
  readonly answer: number;
  /** The word the question is about, to link to its page after answering. */
  readonly word: Entry;
}

/** A small seeded random generator, so a seed always gives the same question. */
function random(seed: number): () => number {
  let state = (seed * 2654435761) >>> 0 || 1;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: readonly T[], next: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function withOptions(
  text: string,
  right: string,
  wrong: readonly string[],
  word: Entry,
  next: () => number,
): Question {
  const options = shuffle([right, ...wrong], next);
  return { text, options, answer: options.indexOf(right), word };
}

/** The language a word comes from, when its origin says so plainly. */
function originLanguage(entry: Entry): string | undefined {
  const match = entry.orijin?.match(/^Soti nan (fransè|anglè|panyòl) /);
  return match ? match[1][0].toUpperCase() + match[1].slice(1) : undefined;
}

/**
 * The question for a seed: what a word means, where it comes from, or how many syllables it has.
 * The same seed always gives the same question; the home page uses the day as seed.
 */
export function makeQuestion(seed: number): Question {
  const next = random(seed);
  const word = ENTRIES[Math.floor(next() * ENTRIES.length)];
  const kind = Math.floor(next() * 3);

  const language = originLanguage(word);
  if (kind === 1 && language) {
    const others = ['Fransè', 'Anglè', 'Panyòl'].filter((l) => l !== language);
    return withOptions(`Ki lang mo «${word.mo}» soti?`, language, others, word, next);
  }
  if (kind === 2) {
    const count = word.silab.length;
    const others = [1, 2, 3, 4]
      .filter((n) => n !== count)
      .slice(0, 2)
      .map(String);
    return withOptions(`Konbyen silab mo «${word.mo}» genyen?`, String(count), others, word, next);
  }
  const wrong = shuffle(
    ENTRIES.filter((other) => other.id !== word.id),
    next,
  )
    .slice(0, 2)
    .map((other) => other.sans[0].definisyon);
  return withOptions(`Ki sa mo «${word.mo}» vle di?`, word.sans[0].definisyon, wrong, word, next);
}

/** Today's number, counted in days, as the seed of the question of the day. */
export function today(): number {
  return Math.floor(Date.now() / 86_400_000);
}
