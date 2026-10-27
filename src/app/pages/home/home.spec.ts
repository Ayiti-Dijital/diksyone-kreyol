import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

describe('Home', () => {
  let page: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(Home);
    page = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('has one main title', () => {
    const titles = page.querySelectorAll('h1');
    expect(titles.length).toBe(1);
    expect(titles[0].textContent).toContain('Diksyonè Kreyòl–Kreyòl');
  });

  it('shows the breadcrumb with the current page last', () => {
    const current = page.querySelector('nav[aria-label="Kote ou ye"] [aria-current="page"]');
    expect(current?.textContent).toContain('Diksyonè Kreyòl–Kreyòl');
  });

  it('links the 32 letters and letter groups of the alphabet', () => {
    const letters = page.querySelectorAll<HTMLAnchorElement>('#alfabe-seksyon a');
    expect(letters.length).toBe(32);
    expect(decodeURIComponent(letters[1].getAttribute('href') ?? '')).toBe('/let/an');
  });

  it('shows the word of the day right after the alphabet', () => {
    const order = [
      ...page.querySelectorAll('#alfabe-seksyon, #mo-jou-a, section[aria-labelledby="zouti-tit"]'),
    ];
    expect(order.map((el) => el.id || 'zouti')).toEqual(['alfabe-seksyon', 'mo-jou-a', 'zouti']);
  });

  it('shows four tool tiles: the dictionary opens, the others are coming soon', () => {
    const tiles = [...page.querySelectorAll('section[aria-labelledby="zouti-tit"] li')];
    expect(tiles.length).toBe(4);
    expect(tiles[0].querySelector('a[href="/let/a"]')?.textContent).toContain('Louvri');
    expect(tiles.slice(1).every((tile) => tile.textContent?.includes('Byento'))).toBe(true);
  });

  it('lists every word of the dictionary', () => {
    expect(page.querySelectorAll('section[aria-labelledby="tout-mo-tit"] li').length).toBe(33);
  });

  it('shows the word of the day as a marked draft', () => {
    const entry = page.querySelector('article[aria-labelledby="mo-konbit"]')!;
    expect(entry.querySelector('h3')?.textContent).toContain('konbit');
    expect(entry.textContent).toContain('bouyon');
  });

  it('links the help button to the contact email and the games teaser to /jwet', () => {
    const help = page.querySelector<HTMLAnchorElement>('#ede-nou a[href^="mailto:"]')!;
    expect(help.href).toContain('kontakt@ayitidijital.org');
    expect(page.querySelector('a[href="/jwet"]')).toBeTruthy();
  });
});
