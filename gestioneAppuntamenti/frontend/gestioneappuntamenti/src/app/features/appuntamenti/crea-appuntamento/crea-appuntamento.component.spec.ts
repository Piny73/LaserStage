import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaAppuntamentoComponent } from './crea-appuntamento.component';

describe('CreaAppuntamentoComponent', () => {
  let component: CreaAppuntamentoComponent;
  let fixture: ComponentFixture<CreaAppuntamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreaAppuntamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreaAppuntamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
