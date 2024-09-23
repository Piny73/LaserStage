import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneUtenteComponent } from './gestione-utente.component';

describe('GestioneUtenteComponent', () => {
  let component: GestioneUtenteComponent;
  let fixture: ComponentFixture<GestioneUtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestioneUtenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestioneUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
