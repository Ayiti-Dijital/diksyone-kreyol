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
