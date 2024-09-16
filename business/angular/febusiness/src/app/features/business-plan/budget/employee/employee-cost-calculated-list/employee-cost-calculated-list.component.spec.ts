import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCostCalculatedListComponent } from './employee-cost-calculated-list.component';

describe('EmployeeCostCalculatedListComponent', () => {
  let component: EmployeeCostCalculatedListComponent;
  let fixture: ComponentFixture<EmployeeCostCalculatedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeCostCalculatedListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeCostCalculatedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
