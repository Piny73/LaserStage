import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneClientiComponent } from './gestione-clienti.component';

describe('GestioneClientiComponent', () => {
  let component: GestioneClientiComponent;
  let fixture: ComponentFixture<GestioneClientiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestioneClientiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestioneClientiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
