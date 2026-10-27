import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Mo } from './mo';

describe('Mo', () => {
  async function render(id: string): Promise<HTMLElement> {
    await TestBed.configureTestingModule({
      imports: [Mo],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(Mo);
    fixture.componentRef.setInput('id', id);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows a word with its phones, meanings, examples and draft label', async () => {
    const page = await render('fèt');
    expect(page.querySelector('h1')?.textContent).toContain('fèt');
    expect(page.textContent).toContain('/fɛt/');
    expect(page.querySelectorAll('article ol li').length).toBe(2);
    expect(page.textContent).toContain('«Li fèt Okap.»');
    expect(page.textContent).toContain('bouyon');
    expect(page.querySelector('a[href="/let/%C3%A8"]')).toBeTruthy();
    expect(page.querySelector('dk-word-actions')).toBeTruthy();
  });

  it('shows the syllables of the word', async () => {
    const page = await render('konbit');
    expect(page.querySelector('article strong[aria-label="kon, bit"]')?.textContent?.trim()).toBe(
      'kon|bit',
    );
  });

  it('links related words and the neighbours in dictionary order', async () => {
    const page = await render('chat');
    expect(page.querySelector('a[href="/mo/chen"]')).toBeTruthy();
    expect(page.querySelector('nav[aria-label="Mo anvan ak mo apre"]')?.textContent).toContain(
      'bouch',
    );
  });

  it('offers to propose a word that is not in the dictionary', async () => {
    const page = await render('lekol');
    expect(page.querySelector('h1')?.textContent).toContain('Nou poko gen mo «lekol»');
    expect(page.querySelector('a[href^="mailto:"]')).toBeTruthy();
  });
});
