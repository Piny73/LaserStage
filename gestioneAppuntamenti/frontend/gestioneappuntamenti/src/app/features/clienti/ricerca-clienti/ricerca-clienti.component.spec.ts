import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicercaClientiComponent } from './ricerca-clienti.component';

describe('RicercaClientiComponent', () => {
  let component: RicercaClientiComponent;
  let fixture: ComponentFixture<RicercaClientiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RicercaClientiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RicercaClientiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
