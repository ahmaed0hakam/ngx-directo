import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Directo } from './directo';

describe('Directo', () => {
  let component: Directo;
  let fixture: ComponentFixture<Directo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Directo],
    }).compileComponents();

    fixture = TestBed.createComponent(Directo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
