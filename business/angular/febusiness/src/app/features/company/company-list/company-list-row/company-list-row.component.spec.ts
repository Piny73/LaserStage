import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyListRowComponent } from './company-list-row.component';

describe('CompanyListRowComponent', () => {
  let component: CompanyListRowComponent;
  let fixture: ComponentFixture<CompanyListRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyListRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
