import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppuntamentiListComponent } from './appuntamenti-list.component';

describe('AppuntamentiListComponent', () => {
  let component: AppuntamentiListComponent;
  let fixture: ComponentFixture<AppuntamentiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppuntamentiListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppuntamentiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
