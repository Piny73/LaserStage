import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbEmployeeComponent } from './cb-employee.component';

describe('CbEmployeeComponent', () => {
  let component: CbEmployeeComponent;
  let fixture: ComponentFixture<CbEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CbEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CbEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
