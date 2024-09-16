import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppuntamentiFormComponent } from './appuntamenti-form.component';

describe('AppuntamentiFormComponent', () => {
  let component: AppuntamentiFormComponent;
  let fixture: ComponentFixture<AppuntamentiFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppuntamentiFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppuntamentiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
