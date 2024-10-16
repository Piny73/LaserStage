import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Vettura } from '../../core/models/vettura.model';
import { VetturaService } from '../../core/services/vettura.service';

@Component({
  selector: 'app-vetture',
  templateUrl: './vetture.component.html',
  styleUrls: ['./vetture.component.css']
})
export class VetturaComponent implements OnInit {
  vetturaForm: FormGroup;
  vetture: Vettura[] = [];
  modifica: boolean = false;  // Indica se stiamo modificando una vettura
  vetturaCorrente: Vettura | null = null;  // Mantiene la vettura da modificare

  constructor(private fb: FormBuilder, private vetturaService: VetturaService) {
    this.vetturaForm = this.fb.group({
      targa: ['', [Validators.required, Validators.minLength(5)]],
      marca: ['', Validators.required],
      modello: [''],
      annoProduzione: ['', [Validators.required, this.annoValidator]],
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

  // Validator per l'anno di produzione
  annoValidator(control: FormControl): { [key: string]: boolean } | null {
    const annoInserito = control.value;
    const annoCorrente = new Date().getFullYear();
    return annoInserito > annoCorrente ? { 'annoInvalido': true } : null;
  }

  // Metodo per aggiungere o modificare una vettura
  salvaVettura(): void {
    if (this.vetturaForm.valid) {
      const vetturaDaSalvare = new Vettura(this.vetturaForm.value);
      if (this.modifica && this.vetturaCorrente) {
        // Stiamo modificando una vettura esistente
        vetturaDaSalvare.targa = this.vetturaCorrente.targa; // Manteniamo la targa originale
        this.vetturaService.modificaVettura(vetturaDaSalvare).subscribe({
          next: () => {
            this.caricaVetture();
            this.resetForm();
          },
          error: (error) => {
            console.error('Errore nella modifica della vettura:', error);
          }
        });
      } else {
        // Stiamo aggiungendo una nuova vettura
        this.vetturaService.creaVettura(vetturaDaSalvare).subscribe({
          next: () => {
            this.caricaVetture();
            this.resetForm();
          },
          error: (error) => {
            console.error('Errore nell\'aggiunta della vettura:', error);
          }
        });
      }
    }
  }

  // Metodo per impostare la vettura da modificare
  modificaVettura(vettura: Vettura): void {
    this.vetturaForm.patchValue(vettura);
    this.modifica = true;
    this.vetturaCorrente = vettura;
  }

  // Metodo per eliminare una vettura
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

  // Resetta il form e lo stato di modifica
  resetForm(): void {
    this.vetturaForm.reset({
      targa: '',
      marca: '',
      modello: '',
      annoProduzione: '',
      disponibile: true
    });
    this.modifica = false;
    this.vetturaCorrente = null;
  }
}

