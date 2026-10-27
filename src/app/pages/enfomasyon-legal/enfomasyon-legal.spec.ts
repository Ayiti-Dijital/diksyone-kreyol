import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EnfomasyonLegal } from './enfomasyon-legal';

describe('EnfomasyonLegal', () => {
  it('renders one main title and the breadcrumb', async () => {
    await TestBed.configureTestingModule({
      imports: [EnfomasyonLegal],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(EnfomasyonLegal);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelectorAll('h1').length).toBe(1);
    expect(page.querySelector('nav[aria-label="Kote ou ye"]')).toBeTruthy();
  });
});
