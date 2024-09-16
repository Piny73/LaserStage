import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaListRowComponent } from './area-list-row.component';

describe('AreaListRowComponent', () => {
  let component: AreaListRowComponent;
  let fixture: ComponentFixture<AreaListRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaListRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
