import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbUserComponent } from './cb-user.component';

describe('CbUserComponent', () => {
  let component: CbUserComponent;
  let fixture: ComponentFixture<CbUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CbUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CbUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
