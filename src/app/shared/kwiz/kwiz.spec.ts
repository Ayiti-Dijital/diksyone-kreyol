import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { makeQuestion } from '../kwiz-questions';
import { Kwiz } from './kwiz';

describe('Kwiz', () => {
  const SEED = 42;
  let fixture: ComponentFixture<Kwiz>;
  let page: HTMLElement;

  const radios = () => [...page.querySelectorAll<HTMLInputElement>('input[type="radio"]')];
  const button = () => page.querySelector<HTMLButtonElement>('button')!;

  async function pick(index: number): Promise<void> {
    radios()[index].click();
    await fixture.whenStable();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kwiz],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(Kwiz);
    fixture.componentRef.setInput('start', SEED);
    page = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('shows the question with three options and a disabled check button', () => {
    expect(page.querySelector('legend')?.textContent).toContain(makeQuestion(SEED).text);
    expect(radios().length).toBe(3);
    expect(button().textContent).toContain('Valide');
    expect(button().disabled).toBe(true);
  });

  it('praises the right answer and links to the word', async () => {
    const question = makeQuestion(SEED);
    await pick(question.answer);
    button().click();
    await fixture.whenStable();
    expect(page.textContent).toContain('Bravo!');
    expect(page.querySelector(`[aria-live] a`)?.textContent).toContain(question.word.mo);
  });

  it('shows the right answer after a wrong one, then moves to another question', async () => {
    const question = makeQuestion(SEED);
    await pick((question.answer + 1) % 3);
    button().click();
    await fixture.whenStable();
    expect(page.textContent).toContain('Bon repons lan se');
    button().click();
    await fixture.whenStable();
    expect(page.querySelector('legend')?.textContent).toContain(makeQuestion(SEED + 1).text);
    expect(button().textContent).toContain('Valide');
  });
});
