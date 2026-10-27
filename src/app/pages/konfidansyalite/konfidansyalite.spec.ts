import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Konfidansyalite } from './konfidansyalite';

describe('Konfidansyalite', () => {
  let component: Konfidansyalite;
  let fixture: ComponentFixture<Konfidansyalite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Konfidansyalite],
    }).compileComponents();

    fixture = TestBed.createComponent(Konfidansyalite);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
