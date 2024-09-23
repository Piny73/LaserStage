import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaModificaUtenteComponent } from './crea-modifica-utente.component';

describe('CreaModificaUtenteComponent', () => {
  let component: CreaModificaUtenteComponent;
  let fixture: ComponentFixture<CreaModificaUtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreaModificaUtenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreaModificaUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
