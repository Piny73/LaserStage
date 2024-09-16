import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCostCalculatedComponent } from './employee-cost-calculated.component';

describe('EmployeeCostCalculatedComponent', () => {
  let component: EmployeeCostCalculatedComponent;
  let fixture: ComponentFixture<EmployeeCostCalculatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeCostCalculatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeCostCalculatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
