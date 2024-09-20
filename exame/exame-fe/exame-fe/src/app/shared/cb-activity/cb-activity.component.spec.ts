import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbActivityComponent } from './cb-activity.component';

describe('CbActivityComponent', () => {
  let component: CbActivityComponent;
  let fixture: ComponentFixture<CbActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CbActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CbActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
