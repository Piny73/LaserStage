import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppuntamentiComponent } from './appuntamenti.component';

describe('AppuntamentiComponent', () => {
  let component: AppuntamentiComponent;
  let fixture: ComponentFixture<AppuntamentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppuntamentiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppuntamentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
