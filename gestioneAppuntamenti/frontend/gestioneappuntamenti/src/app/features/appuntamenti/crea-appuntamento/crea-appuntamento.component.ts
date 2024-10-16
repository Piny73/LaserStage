import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importa Router
import { Appuntamento } from '../../../core/models/appuntamento.model'; // Assicurati che il percorso sia corretto

@Component({
  selector: 'app-crea-appuntamento',
  templateUrl: './crea-appuntamento.component.html',
  styleUrls: ['./crea-appuntamento.component.css']
})
export class CreaAppuntamentoComponent {
  appuntamentoForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { // Inietta il Router
    this.appuntamentoForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dataOraInizio: ['', Validators.required],
      dataOraFine: ['', Validators.required],
      descrizione: ['', Validators.required],
      vettura: ['', Validators.required],
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

  closeForm() {
    this.router.navigate(['/home']); // Naviga alla home quando chiudi il form
  }
}





