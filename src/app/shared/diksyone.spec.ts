import {
  ENTRIES,
  displayPhones,
  entriesStartingWith,
  findEntry,
  firstLetter,
  fold,
  search,
  soundExample,
} from './diksyone';

describe('diksyone', () => {
  it('has one sound example for each of the 32 letters', () => {
    expect(new Set(ENTRIES.map((e) => e.let_alfabe).filter(Boolean)).size).toBe(32);
  });

  it('folds accents, case and apostrophes', () => {
    expect(fold("  M'ap  ")).toBe('m ap');
    expect(fold('Fèt')).toBe('fet');
  });

  it('finds words without accents, exact matches first', () => {
    expect(search('fet')[0]?.id).toBe('fèt');
    expect(search('ba').map((e) => e.id)).toEqual(['bato']);
    expect(search('lekol')).toEqual([]);
    expect(search('   ')).toEqual([]);
  });

  it('files words under letter groups', () => {
    expect(firstLetter('chat')).toBe('ch');
    expect(firstLetter('uit')).toBe('ui');
    expect(firstLetter('ane')).toBe('a');
    expect(firstLetter('anvan')).toBe('an');
    expect(entriesStartingWith('ch').map((e) => e.id)).toEqual(['chat', 'chen']);
  });

  it('knows the sound example of a letter and shows phones without spaces', () => {
    expect(soundExample('en')?.id).toBe('chen');
    expect(displayPhones(findEntry('konbit')!.pwononsyasyon)).toBe('kɔ̃bit');
  });
});
