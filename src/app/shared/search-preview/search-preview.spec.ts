import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { SearchPreview } from './search-preview';

describe('SearchPreview', () => {
  let fixture: ComponentFixture<SearchPreview>;
  let page: HTMLElement;
  let router: Router;

  async function search(text: string): Promise<void> {
    const input = page.querySelector<HTMLInputElement>('input#mo')!;
    input.value = text;
    input.dispatchEvent(new Event('input'));
    page.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
    await fixture.whenStable();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPreview],
      providers: [provideRouter([{ path: '**', children: [] }])],
    }).compileComponents();
    fixture = TestBed.createComponent(SearchPreview);
    page = fixture.nativeElement as HTMLElement;
    router = TestBed.inject(Router);
    await fixture.whenStable();
  });

  it('shows nothing before a search', () => {
    expect(page.querySelector('[aria-live]')?.textContent?.trim()).toBe('');
  });

  it('asks for a word when the box is empty', async () => {
    await search('   ');
    expect(page.textContent).toContain('Ekri yon mo anvan ou chèche.');
  });

  it('opens the page of a word typed without its accent', async () => {
    await search('  Fet ');
    expect(decodeURIComponent(router.url)).toBe('/mo/fèt');
  });

  it('lists the words that start with the text', async () => {
    await search('ba');
    const links = [...page.querySelectorAll('[aria-live] a')].map((a) => a.textContent?.trim());
    expect(links).toEqual(['bato']);
  });

  it('offers to propose a word the dictionary does not have', async () => {
    await search('lekol');
    expect(page.textContent).toContain('Nou poko gen mo');
    const link = page.querySelector<HTMLAnchorElement>('a[href^="mailto:"]')!;
    expect(decodeURIComponent(link.href)).toContain('pwopoze mo: lekol');
  });
});
