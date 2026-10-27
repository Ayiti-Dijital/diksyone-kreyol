import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnfomasyonLegal } from './enfomasyon-legal';

describe('EnfomasyonLegal', () => {
  let component: EnfomasyonLegal;
  let fixture: ComponentFixture<EnfomasyonLegal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnfomasyonLegal],
    }).compileComponents();

    fixture = TestBed.createComponent(EnfomasyonLegal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
