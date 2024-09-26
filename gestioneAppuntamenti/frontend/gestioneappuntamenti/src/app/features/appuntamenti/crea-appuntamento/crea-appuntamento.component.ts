import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appuntamento } from '../../../core/models/appuntamento.model'; // Assicurati che il percorso sia corretto

@Component({
  selector: 'app-crea-appuntamento',
  templateUrl: './crea-appuntamento.component.html',
  styleUrls: ['./crea-appuntamento.component.css']
})
export class CreaAppuntamentoComponent {
  appuntamentoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.appuntamentoForm = this.fb.group({
      clienteId: ['', Validators.required],
      dataOraInizio: ['', Validators.required],
      dataOraFine: ['', Validators.required],
      descrizione: ['', Validators.required],
      vetturaId: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.appuntamentoForm.valid) {
      const nuovoAppuntamento: Appuntamento = {
        ...this.appuntamentoForm.value,
        stato: { /* Assegna lo stato se necessario */ } // Aggiungi logica per lo stato se necessario
      };

      console.log(nuovoAppuntamento);
      // Invia il nuovo appuntamento al server
    }
  }
}

