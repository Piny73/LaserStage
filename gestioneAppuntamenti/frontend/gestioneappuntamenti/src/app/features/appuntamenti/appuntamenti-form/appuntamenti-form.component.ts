import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appuntamento } from '../../../core/models/appuntamento.model';
import { Cliente } from '../../../core/models/cliente.model';
import { StatoAppuntoType } from '../../../core/models/stato-appunto.models';
import { Vettura } from '../../../core/models/vettura.model';
import { AppuntamentoService } from '../../../core/services/appuntamento.service';

@Component({
  selector: 'app-appuntamenti-form',
  templateUrl: './appuntamenti-form.component.html',
  styleUrls: ['./appuntamenti-form.component.css']
})
export class AppuntamentiFormComponent implements OnInit {

    appuntamentoForm! : FormGroup;
    appuntamento!: Appuntamento;

 /* appuntamento: Appuntamento = {
    dataOraInizio: new Date().toISOString(), // Inizializza come stringa ISO
    dataOraFine: new Date().toISOString(),   // Stessa cosa qui
    descrizione: '',
    stato: StatoAppuntoType.NUOVO,
    cliente: {
      nome: '',
      cognome: '',
      indirizzo: '',
      telefono: '',
      email: ''
    } as Cliente,
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
    } as Vettura
  }; */

  constructor(private appuntamentoService: AppuntamentoService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.appuntamentoForm = this.fb.group({
      id : [null], // Aggiungi l'ID come proprietà opzionale
      dataOraInizio :["", Validators.required], // Assicurati che sia una stringa nel formato 'YYYY-MM-DDTHH:mm:ss'
      dataOraFine: ["", Validators.required], // Assicurati che sia una stringa nel formato 'YYYY-MM-DDTHH:mm:ss'
      descrizione: ["", Validators.required],
      statoid: [null],
      clientid: [null],
      vetturaid : [null],
    })

    this.appuntamento = new Appuntamento();
    
    this.appuntamentoForm.patchValue({
      ...this.appuntamento
    });


  }

  onSubmit() {
    this.appuntamentoService.creaAppuntamento(this.appuntamento).subscribe({
      next: response => {
        console.log('Appuntamento aggiunto!', response);
        this.resetForm();
      },
      error: err => {
        console.error('Errore nell\'aggiunta dell\'appuntamento:', err);
        // Qui puoi gestire l'errore, ad esempio mostrando un messaggio all'utente
      }
    });
  }

  resetForm() {
    this.appuntamento = {
      dataOraInizio: new Date().toISOString(), // Reset con nuove stringhe ISO
      dataOraFine: new Date().toISOString(),
      descrizione: '',
      stato: StatoAppuntoType.NUOVO,
      cliente: {
        nome: '',
        cognome: '',
        indirizzo: '',
        telefono: '',
        email: ''
      } as Cliente,
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
      } as Vettura
    };
  }
}







