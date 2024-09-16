import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverheadCostCalculatedListComponent } from './overhead-cost-calculated-list.component';

describe('OverheadCostCalculatedListComponent', () => {
  let component: OverheadCostCalculatedListComponent;
  let fixture: ComponentFixture<OverheadCostCalculatedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverheadCostCalculatedListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverheadCostCalculatedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
