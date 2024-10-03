import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserisciClienteComponent } from './inserisci-cliente.component';

describe('InserisciClienteComponent', () => {
  let component: InserisciClienteComponent;
  let fixture: ComponentFixture<InserisciClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InserisciClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserisciClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
