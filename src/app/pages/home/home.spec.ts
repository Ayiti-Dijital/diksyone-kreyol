import { TestBed } from '@angular/core/testing';
import { Home } from './home';

describe('Home', () => {
  let page: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Home] }).compileComponents();
    const fixture = TestBed.createComponent(Home);
    page = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('has one main title', () => {
    const titles = page.querySelectorAll('h1');
    expect(titles.length).toBe(1);
    expect(titles[0].textContent).toContain('Chak mo Kreyòl, esplike an Kreyòl.');
  });

  it('lists the 32 letters and letter groups of the alphabet', () => {
    expect(page.querySelectorAll('[aria-labelledby="alfabe"] li').length).toBe(32);
  });

  it('shows the word of the day as a marked draft', () => {
    const entry = page.querySelector('article[aria-labelledby="mo-konbit"]')!;
    expect(entry.querySelector('h3')?.textContent).toContain('konbit');
    expect(entry.textContent).toContain('bouyon');
  });

  it('links the help button to the contact email', () => {
    const link = page.querySelector<HTMLAnchorElement>('#ede-nou a[href^="mailto:"]')!;
    expect(link.href).toContain('kontakt@ayitidijital.org');
  });
});
