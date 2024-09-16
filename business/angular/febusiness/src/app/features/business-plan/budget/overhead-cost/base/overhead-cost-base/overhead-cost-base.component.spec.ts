import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverheadCostBaseComponent } from './overhead-cost-base.component';

describe('OverheadCostBaseComponent', () => {
  let component: OverheadCostBaseComponent;
  let fixture: ComponentFixture<OverheadCostBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverheadCostBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverheadCostBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
