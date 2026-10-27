import data from '../data/diksyone.json';

export interface Sense {
  readonly kategori: string;
  readonly definisyon: string;
  readonly egzanp: readonly string[];
}

/** One dictionary entry, as written in `entries/<letter>/<id>.json`. */
export interface Entry {
  readonly id: string;
  readonly mo: string;
  readonly varyant: readonly string[];
  readonly pwononsyasyon: string;
  /** The syllables, e.g. ["kon", "bit"]. */
  readonly silab: readonly string[];
  /** The alphabet letter or letter group this word is the sound example for. */
  readonly let_alfabe?: string;
  readonly sans: readonly Sense[];
  readonly mo_ki_gen_rapo?: {
    readonly sinonim?: readonly string[];
    readonly kontre?: readonly string[];
    readonly gade_tou?: readonly string[];
  };
  /** Fixed expressions and proverbs with this word, each with its meaning. */
  readonly ekspresyon?: readonly { readonly ekspresyon: string; readonly sans: string }[];
  /** Where the word comes from, in one sentence. */
  readonly orijin?: string;
  /** Words that often appear in the same sentences, computed by `tools/build-index.mjs`. */
  readonly konbinezon?: readonly { readonly mo: string; readonly kantite: number }[];
  readonly sous: { readonly ekri_pa: string; readonly baze_sou?: string };
  readonly estati: { readonly nivo: 'bouyon' | 'revize' | 'valide'; readonly dat: string };
}

/** All entries, sorted like a dictionary (built by `tools/build-index.mjs`). */
export const ENTRIES = data as readonly Entry[];

const BY_ID = new Map(ENTRIES.map((entry) => [entry.id, entry]));

export function findEntry(id: string): Entry | undefined {
  return BY_ID.get(id.normalize('NFC'));
}

/** Lowercase, without accents, apostrophes as spaces: "M'ap" → "m ap", "Fèt" → "fet". */
export function fold(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/['’]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Entries matching the whole word first (accents optional), then entries starting with it. */
export function search(query: string): readonly Entry[] {
  const wanted = fold(query);
  if (!wanted) return [];
  const matches = (entry: Entry) =>
    [entry.mo, ...entry.varyant].some((word) => fold(word) === wanted);
  const exact = ENTRIES.filter(matches);
  const starting = ENTRIES.filter((entry) => !matches(entry) && fold(entry.mo).startsWith(wanted));
  return [...exact, ...starting];
}

/** True when the query names this entry exactly (accents optional). */
export function isExact(entry: Entry, query: string): boolean {
  return [entry.mo, ...entry.varyant].some((word) => fold(word) === fold(query));
}

const GROUPS = ['oun', 'ou', 'ui', 'ch', 'ng', 'an', 'en', 'on'];
const NASAL = new Set(['an', 'en', 'on', 'oun']);

/** The alphabet letter or letter group a word is filed under: "chat" → "ch", "ane" → "a". */
export function firstLetter(word: string): string {
  const w = word.normalize('NFC').toLowerCase();
  for (const group of GROUPS) {
    // an, en, on and oun are one sound only when no vowel follows: "ane" is a + n + e.
    if (w.startsWith(group) && !(NASAL.has(group) && /[aàeèioòu]/.test(w[group.length] ?? ''))) {
      return group;
    }
  }
  return w[0] ?? '';
}

export function entriesStartingWith(letter: string): readonly Entry[] {
  return ENTRIES.filter((entry) => firstLetter(entry.mo) === letter);
}

/** The entry chosen as the sound example of an alphabet letter. */
export function soundExample(letter: string): Entry | undefined {
  return ENTRIES.find((entry) => entry.let_alfabe === letter);
}

/** "k ɔ̃ b i t" → "kɔ̃bit", for display between slashes. */
export function displayPhones(phones: string): string {
  return phones.replace(/ /g, '');
}
