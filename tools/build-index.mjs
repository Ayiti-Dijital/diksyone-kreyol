// Checks every entry in entries/ and writes them as one sorted file for the website:
// src/app/data/diksyone.json. Runs before every build and test (see package.json).
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, basename } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const ENTRIES = join(ROOT, 'entries');
const OUT = join(ROOT, 'src/app/data/diksyone.json');
const SITEMAP = join(ROOT, 'public/sitemap.xml');
const SITE = 'https://diksyone.ayitidijital.org';

// The phone set of the Kreyòl TTS (Ayiti-Dijital/haitian-creole-tts, kreyol/phones.py). Keep in sync.
const PHONES = new Set(
  'a e ɛ i o ɔ u ã ɛ̃ ɔ̃ ũ p b t d k ɡ f v s z ʃ ʒ m n ŋ l ɣ h w j ɥ'
    .split(' ')
    .map((p) => p.normalize('NFC')),
);
const CATEGORIES = new Set([
  'non',
  'vèb',
  'adjektif',
  'advèb',
  'pwonon',
  'prepozisyon',
  'konjonksyon',
  'detèminan',
  'mak tan/aspè',
  'entèjeksyon',
  'nimewo',
  'ekspresyon',
]);
const STATUSES = new Set(['bouyon', 'revize', 'valide']);
const LETTERS = new Set(
  'a an b ch d e è en f g h i j k l m n ng o ò on ou oun p r s t ui v w y z'.split(' '),
);

const problems = [];
const entries = [];

for (const dir of readdirSync(ENTRIES, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  for (const file of readdirSync(join(ENTRIES, dir.name))) {
    if (!file.endsWith('.json')) continue;
    const path = join('entries', dir.name, file);
    const entry = JSON.parse(readFileSync(join(ENTRIES, dir.name, file), 'utf8'));
    const fail = (message) => problems.push(`${path}: ${message}`);
    if (entry.id !== basename(file, '.json').normalize('NFC'))
      fail(`id "${entry.id}" does not match the file name`);
    if (!entry.mo) fail('"mo" is missing');
    const phones = (entry.pwononsyasyon ?? '').normalize('NFC').split(' ').filter(Boolean);
    if (!phones.length) fail('"pwononsyasyon" is missing');
    for (const p of phones) if (!PHONES.has(p)) fail(`unknown phone "${p}"`);
    if (entry.let_alfabe && !LETTERS.has(entry.let_alfabe))
      fail(`unknown letter "${entry.let_alfabe}"`);
    if (!entry.silab?.length || entry.silab.join('') !== entry.mo)
      fail('"silab" must spell the word, e.g. ["kon", "bit"]');
    if (!entry.sans?.length) fail('needs at least one meaning in "sans"');
    for (const sens of entry.sans ?? []) {
      if (!CATEGORIES.has(sens.kategori)) fail(`unknown part of speech "${sens.kategori}"`);
      if (!sens.definisyon) fail('a meaning has no "definisyon"');
      if (!sens.egzanp?.length || sens.egzanp.length > 2)
        fail('each meaning needs 1 or 2 examples');
    }
    for (const key of ['sinonim', 'kontre', 'gade_tou']) {
      const words = entry.mo_ki_gen_rapo?.[key];
      if (
        words !== undefined &&
        (!Array.isArray(words) || words.some((w) => typeof w !== 'string' || !w))
      ) {
        fail(`"mo_ki_gen_rapo.${key}" must be a list of words`);
      }
    }
    for (const item of entry.ekspresyon ?? []) {
      if (!item.ekspresyon || !item.sans) fail('each expression needs "ekspresyon" and "sans"');
    }
    if (entry.orijin !== undefined && (typeof entry.orijin !== 'string' || !entry.orijin)) {
      fail('"orijin" must be a sentence');
    }
    if (!entry.sous?.ekri_pa) fail('"sous.ekri_pa" is missing');
    if (!STATUSES.has(entry.estati?.nivo)) fail(`unknown status "${entry.estati?.nivo}"`);
    entries.push(entry);
  }
}

const ids = new Set(entries.map((e) => e.id));
for (const entry of entries) {
  for (const other of entry.mo_ki_gen_rapo?.gade_tou ?? []) {
    if (!ids.has(other)) problems.push(`entries/${entry.id}: related word "${other}" has no entry`);
  }
}
if (ids.size !== entries.length) problems.push('two entries have the same id');

if (problems.length) {
  console.error(`${problems.length} problem(s) in entries/:\n- ${problems.join('\n- ')}`);
  process.exit(1);
}

const fold = (s) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();

// Typical combinations ("Mo ki ale avè l"), computed from the dictionary's own sentences: for each
// word, the other words that appear most often in the same sentences (examples, definitions,
// expressions). Small grammar words are left out.
const SMALL_WORDS = new Set(
  (
    'a an la lan nan yo ak avèk avè epi e ki pou se li l m mwen w ou nou n yon de te ap pral pa sou ' +
    "ke kòm lè si men oswa tou sa gen genyen sila ladan pwovèb l'ap m'ap"
  ).split(' '),
);
const tokens = (sentence) =>
  sentence
    .normalize('NFC')
    .toLowerCase()
    .replace(/[«»"“”.,!?;:()]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1 && !SMALL_WORDS.has(word) && !/^\d/.test(word));
const sentences = entries
  .flatMap((entry) => [
    ...entry.sans.flatMap((sens) => [sens.definisyon, ...sens.egzanp]),
    ...(entry.ekspresyon ?? []).flatMap((item) => [item.ekspresyon, item.sans]),
  ])
  .map(tokens);
for (const entry of entries) {
  const counts = new Map();
  const forms = new Set([entry.mo, ...entry.varyant].map((w) => w.normalize('NFC').toLowerCase()));
  for (const words of sentences) {
    if (!words.some((word) => forms.has(word))) continue;
    for (const word of new Set(words)) {
      if (!forms.has(word)) counts.set(word, (counts.get(word) ?? 0) + 1);
    }
  }
  entry.konbinezon = [...counts]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 16)
    .map(([mo, kantite]) => ({ mo, kantite }));
}
entries.sort((a, b) => fold(a.mo).localeCompare(fold(b.mo)) || a.mo.localeCompare(b.mo));
writeFileSync(OUT, JSON.stringify(entries, null, 1) + '\n');
const pages = [
  '',
  ...[...LETTERS].map((letter) => `let/${encodeURIComponent(letter)}`),
  ...entries.map((entry) => `mo/${encodeURIComponent(entry.id)}`),
  'jwet',
  'enfomasyon-legal',
  'konfidansyalite',
];
writeFileSync(
  SITEMAP,
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    pages.map((page) => `  <url><loc>${SITE}/${page}</loc></url>\n`).join('') +
    '</urlset>\n',
);
console.log(
  `${entries.length} entries checked → src/app/data/diksyone.json, ${pages.length} pages → public/sitemap.xml`,
);
