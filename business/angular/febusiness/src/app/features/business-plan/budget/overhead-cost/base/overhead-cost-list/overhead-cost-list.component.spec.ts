import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverheadCostListComponent } from './overhead-cost-list.component';

describe('OverheadCostListComponent', () => {
  let component: OverheadCostListComponent;
  let fixture: ComponentFixture<OverheadCostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverheadCostListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverheadCostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
