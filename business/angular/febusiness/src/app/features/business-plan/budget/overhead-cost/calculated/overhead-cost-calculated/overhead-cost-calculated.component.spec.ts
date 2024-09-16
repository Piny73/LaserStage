import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverheadCostCalculatedComponent } from './overhead-cost-calculated.component';

describe('OverheadCostCalculatedComponent', () => {
  let component: OverheadCostCalculatedComponent;
  let fixture: ComponentFixture<OverheadCostCalculatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverheadCostCalculatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverheadCostCalculatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
