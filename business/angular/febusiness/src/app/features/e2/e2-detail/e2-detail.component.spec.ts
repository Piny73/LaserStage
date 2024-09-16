import { ComponentFixture, TestBed } from '@angular/core/testing';

import { E2DetailComponent } from './e2-detail.component';

describe('E2DetailComponent', () => {
  let component: E2DetailComponent;
  let fixture: ComponentFixture<E2DetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [E2DetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(E2DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
