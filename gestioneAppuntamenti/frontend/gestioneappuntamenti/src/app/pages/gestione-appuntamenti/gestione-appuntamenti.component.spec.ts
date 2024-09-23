import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneAppuntamentiComponent } from './gestione-appuntamenti.component';

describe('GestioneAppuntamentiComponent', () => {
  let component: GestioneAppuntamentiComponent;
  let fixture: ComponentFixture<GestioneAppuntamentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestioneAppuntamentiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestioneAppuntamentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
