import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPlanListRowComponent } from './business-plan-list-row.component';

describe('BusinessPlanListRowComponent', () => {
  let component: BusinessPlanListRowComponent;
  let fixture: ComponentFixture<BusinessPlanListRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessPlanListRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessPlanListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
