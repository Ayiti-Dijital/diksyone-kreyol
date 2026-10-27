import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Konfidansyalite } from './konfidansyalite';

describe('Konfidansyalite', () => {
  it('renders one main title and the breadcrumb', async () => {
    await TestBed.configureTestingModule({
      imports: [Konfidansyalite],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(Konfidansyalite);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelectorAll('h1').length).toBe(1);
    expect(page.querySelector('nav[aria-label="Kote ou ye"]')).toBeTruthy();
  });
});
