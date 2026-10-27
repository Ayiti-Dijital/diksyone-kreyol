import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the skip link, the header and the footer', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('a[href="#kontni"]')?.textContent).toContain('kontni');
    expect(page.querySelector('dk-site-header header')).toBeTruthy();
    expect(page.querySelector('dk-site-footer footer')).toBeTruthy();
    expect(page.querySelector('main#kontni')).toBeTruthy();
  });
});
