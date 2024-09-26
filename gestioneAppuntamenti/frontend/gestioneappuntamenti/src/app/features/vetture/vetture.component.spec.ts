import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VettureComponent } from './vetture.component';

describe('VettureComponent', () => {
  let component: VettureComponent;
  let fixture: ComponentFixture<VettureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VettureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VettureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
