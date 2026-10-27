import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Jwet } from './jwet';

describe('Jwet', () => {
  let page: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jwet],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(Jwet);
    page = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('lists six games, each marked as coming soon', () => {
    const cards = page.querySelectorAll('ul > li[aria-labelledby^="jwet-"]');
    expect(cards.length).toBe(6);
    cards.forEach((card) => expect(card.textContent).toContain('Byento'));
  });

  it('shows ten markers on the quiz card', () => {
    expect(page.querySelectorAll('ol[aria-label="10 kesyon"] li').length).toBe(10);
  });

  it('answers the frequent questions in collapsible blocks', () => {
    expect(page.querySelectorAll('details summary').length).toBe(4);
  });
});
