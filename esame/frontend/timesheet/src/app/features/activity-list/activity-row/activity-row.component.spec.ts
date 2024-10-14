import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityRowComponent } from './activity-row.component';

describe('ActivityRowComponent', () => {
  let component: ActivityRowComponent;
  let fixture: ComponentFixture<ActivityRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
