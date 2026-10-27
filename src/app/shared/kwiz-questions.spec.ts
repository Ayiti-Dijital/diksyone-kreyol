import { makeQuestion } from './kwiz-questions';

describe('makeQuestion', () => {
  it('always gives the same question for the same seed', () => {
    expect(makeQuestion(20_000)).toEqual(makeQuestion(20_000));
  });

  it('gives three different options with the right one among them', () => {
    for (let seed = 1; seed <= 200; seed++) {
      const question = makeQuestion(seed);
      expect(question.options.length).toBe(3);
      expect(new Set(question.options).size).toBe(3);
      expect(question.answer).toBeGreaterThanOrEqual(0);
      expect(question.text).toContain(`«${question.word.mo}»`);
    }
  });

  it('asks about meanings, origins and syllables', () => {
    const texts = Array.from({ length: 200 }, (_, seed) => makeQuestion(seed + 1).text);
    expect(texts.some((t) => t.startsWith('Ki sa mo'))).toBe(true);
    expect(texts.some((t) => t.startsWith('Ki lang mo'))).toBe(true);
    expect(texts.some((t) => t.startsWith('Konbyen silab'))).toBe(true);
  });
});
