import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomesCalculatedComponent } from './incomes-calculated.component';

describe('IncomesCalculatedComponent', () => {
  let component: IncomesCalculatedComponent;
  let fixture: ComponentFixture<IncomesCalculatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncomesCalculatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomesCalculatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
