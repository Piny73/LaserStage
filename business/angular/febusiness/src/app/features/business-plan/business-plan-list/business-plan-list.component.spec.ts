import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPlanListComponent } from './business-plan-list.component';

describe('BusinessPlanListComponent', () => {
  let component: BusinessPlanListComponent;
  let fixture: ComponentFixture<BusinessPlanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessPlanListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
