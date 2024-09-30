import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vettura } from '../../core/models/vettura.model';
import { VetturaService } from '../../core/services/vettura.service';

@Component({
  selector: 'app-vetture',
  templateUrl: './vetture.component.html',
  styleUrl: './vetture.component.css'
})
export class VetturaComponent implements OnInit {
  vetturaForm: FormGroup;
  vetture: Vettura[] = [];

  constructor(private fb: FormBuilder, private vetturaService: VetturaService) {
    this.vetturaForm = this.fb.group({
      targa: ['', Validators.required],
      marca: ['', Validators.required],
      modello: [''],
      annoProduzione: [''],
      disponibile: [true]
    });
  }

  ngOnInit(): void {
    this.caricaVetture();
  }

  caricaVetture(): void {
    this.vetturaService.getVetture().subscribe({
      next: (vetture) => {
        this.vetture = vetture;
      },
      error: (error) => {
        console.error('Errore nel caricamento delle vetture:', error);
      }
    });
  }

  aggiungiVettura(): void {
    if (this.vetturaForm.valid) {
      const nuovaVettura = new Vettura(this.vetturaForm.value);
      this.vetturaService.creaVettura(nuovaVettura).subscribe({
        next: () => {
          this.caricaVetture();
          this.vetturaForm.reset();
        },
        error: (error) => {
          console.error('Errore nell\'aggiunta della vettura:', error);
        }
      });
    }
  }

  eliminaVettura(targa: string): void {
    this.vetturaService.eliminaVettura(targa).subscribe({
      next: () => {
        this.caricaVetture(); // Ricarica la lista dopo l'eliminazione
      },
      error: (error) => {
        console.error('Errore nell\'eliminazione della vettura:', error);
      }
    });
  }
}