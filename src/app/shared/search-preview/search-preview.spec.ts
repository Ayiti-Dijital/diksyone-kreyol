import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchPreview } from './search-preview';

describe('SearchPreview', () => {
  let fixture: ComponentFixture<SearchPreview>;
  let page: HTMLElement;

  async function search(text: string): Promise<void> {
    const input = page.querySelector<HTMLInputElement>('input#mo')!;
    input.value = text;
    input.dispatchEvent(new Event('input'));
    page.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
    await fixture.whenStable();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SearchPreview] }).compileComponents();
    fixture = TestBed.createComponent(SearchPreview);
    page = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('shows nothing before a search', () => {
    expect(page.querySelector('[aria-live]')?.textContent?.trim()).toBe('');
  });

  it('asks for a word when the box is empty', async () => {
    await search('   ');
    expect(page.textContent).toContain('Ekri yon mo anvan ou chèche.');
  });

  it('says the dictionary is not ready and offers to propose the word', async () => {
    await search('  konbit ');
    expect(page.textContent).toContain('Diksyonè a poko pare');
    expect(page.querySelector('strong')?.textContent).toContain('«konbit»');
    const link = page.querySelector<HTMLAnchorElement>('a[href^="mailto:"]')!;
    expect(decodeURIComponent(link.href)).toContain('pwopoze mo: konbit');
  });
});
