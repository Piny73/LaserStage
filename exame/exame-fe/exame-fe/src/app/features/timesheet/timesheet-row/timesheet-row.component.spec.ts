import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetRowComponent } from './timesheet-row.component';

describe('TimesheetRowComponent', () => {
  let component: TimesheetRowComponent;
  let fixture: ComponentFixture<TimesheetRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimesheetRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
