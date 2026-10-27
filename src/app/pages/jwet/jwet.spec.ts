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

  it('shows three featured games and three game tiles, all coming soon', () => {
    const cards = page.querySelectorAll('li[aria-labelledby^="jwet-"]');
    expect(cards.length).toBe(6);
    cards.forEach((card) => expect(card.textContent).toContain('Byento'));
  });

  it('shows five numbered steps on the quiz card', () => {
    expect(page.querySelectorAll('ol[aria-label="5 kesyon"] > li').length).toBe(5);
  });

  it('answers the frequent questions in collapsible blocks', () => {
    expect(page.querySelectorAll('details summary').length).toBe(4);
  });
});
