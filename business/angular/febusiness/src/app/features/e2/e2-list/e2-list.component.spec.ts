import { ComponentFixture, TestBed } from '@angular/core/testing';

import { E2ListComponent } from './e2-list.component';

describe('E2ListComponent', () => {
  let component: E2ListComponent;
  let fixture: ComponentFixture<E2ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [E2ListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(E2ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
