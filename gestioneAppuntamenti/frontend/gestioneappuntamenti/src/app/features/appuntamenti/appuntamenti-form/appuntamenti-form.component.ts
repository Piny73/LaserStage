import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appuntamento } from '../../../core/models/appuntamento.model';
import { Cliente } from '../../../core/models/cliente.model';
import { StatoAppuntoType } from '../../../core/models/stato-appunto.model';
import { Vettura } from '../../../core/models/vettura.model';
import { AppuntamentoService } from '../../../core/services/appuntamento.service';

@Component({
  selector: 'app-appuntamenti-form',
  templateUrl: './appuntamenti-form.component.html',
  styleUrls: ['./appuntamenti-form.component.css']
})
export class AppuntamentiFormComponent implements OnInit {

  appuntamentoForm!: FormGroup;
  appuntamento!: Appuntamento;

  constructor(private appuntamentoService: AppuntamentoService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.resetForm(); // Resetta il form all'inizializzazione
  }

  // Metodo per inizializzare il form con le proprietà di base
  initForm(): void {
    this.appuntamentoForm = this.fb.group({
      id: [null], // ID opzionale
      dataOraInizio: ["", Validators.required], // Formato stringa 'YYYY-MM-DDTHH:mm:ss'
      dataOraFine: ["", Validators.required],  // Formato stringa 'YYYY-MM-DDTHH:mm:ss'
      descrizione: ["", Validators.required],
      stato: [StatoAppuntoType.NUOVO, Validators.required], // Imposta lo stato iniziale come 'NUOVO'
      cliente: this.fb.group({ // Gruppo per i dettagli del cliente
        nome: ["", Validators.required],
        cognome: ["", Validators.required],
        indirizzo: [""],
        telefono: [""],
        email: ["", [Validators.required, Validators.email]]
      }),
      vettura: this.fb.group({ // Gruppo per i dettagli della vettura
        targa: ["", Validators.required],
        marca: ["", Validators.required],
        modello: ["", Validators.required],
        annoProduzione: [new Date().getFullYear(), Validators.required],
        disponibile: [true],
        diesel: [false],
        benzina: [false],
        gpl: [false],
        elettrica: [false]
      })
    });
  }

  // Metodo per inviare il form
  onSubmit(): void {
    if (this.appuntamentoForm.invalid) {
      console.error('Form non valido');
      return;
    }

    // Mappa i valori del form all'oggetto Appuntamento
    const formValues = this.appuntamentoForm.value;
    const newAppuntamento: Appuntamento = {
      ...this.appuntamento, // Proprietà già esistenti
      ...formValues, // Valori del form
      cliente: { ...formValues.cliente } as Cliente,
      vettura: { ...formValues.vettura } as Vettura
    };

    this.appuntamentoService.creaAppuntamento(newAppuntamento).subscribe({
      next: response => {
        console.log('Appuntamento aggiunto con successo!', response);
        this.resetForm(); // Resetta il form dopo l'invio
      },
      error: err => {
        console.error('Errore durante l\'aggiunta dell\'appuntamento:', err);
      }
    });
  }

  // Metodo per resettare il form e l'oggetto Appuntamento
  resetForm(): void {
    this.appuntamentoForm.reset({
      id: null,
      dataOraInizio: new Date().toISOString().slice(0, 16), // Inizializza con l'ora corrente
      dataOraFine: new Date().toISOString().slice(0, 16), // Inizializza con l'ora corrente
      descrizione: '',
      stato: StatoAppuntoType.NUOVO,
      cliente: {
        nome: '',
        cognome: '',
        indirizzo: '',
        telefono: '',
        email: ''
      },
      vettura: {
        targa: '',
        marca: '',
        modello: '',
        annoProduzione: new Date().getFullYear(),
        disponibile: true,
        diesel: false,
        benzina: false,
        gpl: false,
        elettrica: false
      }
    });
  }
}

