import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomesCalculatedListComponent } from './incomes-calculated-list.component';

describe('IncomesCalculatedListComponent', () => {
  let component: IncomesCalculatedListComponent;
  let fixture: ComponentFixture<IncomesCalculatedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncomesCalculatedListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomesCalculatedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
