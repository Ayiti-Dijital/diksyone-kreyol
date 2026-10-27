import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Let } from './let';

describe('Let', () => {
  async function render(letter: string): Promise<HTMLElement> {
    await TestBed.configureTestingModule({
      imports: [Let],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(Let);
    fixture.componentRef.setInput('letter', letter);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows the sound example and the words that start with the letter group', async () => {
    const page = await render('ch');
    expect(page.querySelector('h1')?.textContent).toContain('ch');
    expect(page.textContent).toContain('chat');
    const words = [...page.querySelectorAll('section ul a')].map((a) => a.textContent?.trim());
    expect(words).toEqual(['chat', 'chen']);
    expect(page.querySelector('dk-alfabe-bar [aria-current="page"]')?.textContent?.trim()).toBe(
      'ch',
    );
  });

  it('says so when no word starts with the letter yet', async () => {
    const page = await render('ng');
    expect(page.textContent).toContain('bilding');
    expect(page.textContent).toContain('Poko gen mo ki kòmanse ak «ng»');
  });
});
