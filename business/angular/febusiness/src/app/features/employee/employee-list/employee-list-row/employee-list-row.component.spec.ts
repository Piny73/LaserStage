import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListRowComponent } from './employee-list-row.component';

describe('EmployeeListRowComponent', () => {
  let component: EmployeeListRowComponent;
  let fixture: ComponentFixture<EmployeeListRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeListRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
