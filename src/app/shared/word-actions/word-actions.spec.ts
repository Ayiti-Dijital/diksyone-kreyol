import { ComponentFixture, TestBed } from '@angular/core/testing';
import { findEntry } from '../diksyone';
import { WordActions } from './word-actions';

describe('WordActions', () => {
  let fixture: ComponentFixture<WordActions>;
  let page: HTMLElement;
  let copied: string[];

  const button = (label: string) =>
    page.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`)!;

  beforeEach(async () => {
    copied = [];
    Object.defineProperty(document.defaultView!.navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async (text: string) => void copied.push(text) },
    });
    await TestBed.configureTestingModule({ imports: [WordActions] }).compileComponents();
    fixture = TestBed.createComponent(WordActions);
    fixture.componentRef.setInput('entry', findEntry('konbit'));
    page = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('shows the four buttons', () => {
    for (const label of ['Site mo a', 'Pataje', 'Kopye mo a', 'Koute mo a']) {
      expect(button(label)).toBeTruthy();
    }
  });

  it('copies the word and says so', async () => {
    button('Kopye mo a').click();
    await fixture.whenStable();
    expect(copied).toEqual(['konbit']);
    expect(page.querySelector('[aria-live]')?.textContent).toContain('Mo a kopye.');
  });

  it('opens a citation with the word and its address, and copies it', async () => {
    button('Site mo a').click();
    await fixture.whenStable();
    const citation = page.querySelector('dialog p')?.textContent ?? '';
    expect(citation).toContain('«konbit». Diksyonè Kreyòl, Ayiti Dijital.');
    expect(citation).toContain('/mo/konbit (konsilte ');
    page.querySelector<HTMLButtonElement>('dialog button:last-child')!.click();
    await fixture.whenStable();
    expect(copied[0]).toBe(citation.trim());
  });

  it('copies the link when the browser has no share sheet', async () => {
    button('Pataje').click();
    await fixture.whenStable();
    expect(copied[0]).toMatch(/\/mo\/konbit$/);
    expect(page.querySelector('[aria-live]')?.textContent).toContain('Lyen an kopye.');
  });

  it('reads the word with a speech voice', async () => {
    const spoken: string[] = [];
    Object.defineProperty(document.defaultView!, 'speechSynthesis', {
      configurable: true,
      value: {
        getVoices: () => [],
        cancel: () => {},
        speak: (u: { text: string }) => spoken.push(u.text),
      },
    });
    Object.defineProperty(document.defaultView!, 'SpeechSynthesisUtterance', {
      configurable: true,
      value: class {
        lang = '';
        rate = 1;
        voice: unknown;
        constructor(public text: string) {}
      },
    });
    button('Koute mo a').click();
    await fixture.whenStable();
    expect(spoken).toEqual(['konbit']);
    expect(page.querySelector('[aria-live]')?.textContent).toContain('fransè');
  });
});
