import { Component } from '@angular/core';
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
export class AppuntamentiFormComponent {
  appuntamento: Appuntamento = {
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
  };

  constructor(private appuntamentoService: AppuntamentoService) { }

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







