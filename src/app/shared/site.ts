export const CONTACT_EMAIL = 'kontakt@ayitidijital.org';
export const REPO_URL = 'https://github.com/Ayiti-Dijital/diksyone-kreyol';
export const MAIN_SITE_URL = 'https://ayitidijital.org';

/** An email link to the Ayiti Dijital contact address with a prefilled subject. */
export function mailto(subject: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

/** The 32 letters and letter groups of the Kreyòl alphabet, in dictionary order. */
export const ALFABE: readonly string[] = [
  'a',
  'an',
  'b',
  'ch',
  'd',
  'e',
  'è',
  'en',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'ng',
  'o',
  'ò',
  'on',
  'ou',
  'oun',
  'p',
  'r',
  's',
  't',
  'ui',
  'v',
  'w',
  'y',
  'z',
];
