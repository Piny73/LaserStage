import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbAreaComponent } from './cb-area.component';

describe('CbAreaComponent', () => {
  let component: CbAreaComponent;
  let fixture: ComponentFixture<CbAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CbAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CbAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
