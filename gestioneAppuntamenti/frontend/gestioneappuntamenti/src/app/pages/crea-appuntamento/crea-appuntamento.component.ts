import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appuntamento } from '../../core/models/appuntamento.model';
import { StatoAppuntoType } from '../../core/models/stato-appuntamento.model';
import { AppuntamentoService } from '../../core/services/appuntamento.services';

@Component({
  selector: 'app-crea-appuntamento',
  templateUrl: './crea-appuntamento.component.html',
  styleUrls: ['./crea-appuntamento.component.css']
})
export class CreaAppuntamentoComponent implements OnInit {
  appuntamento: Appuntamento = {
    dataOraInizio: this.getValidStartTime(),
    dataOraFine: this.getValidStartTime(),
    descrizione: '',
    stato: StatoAppuntoType.NUOVO,
    cliente: { nome: '', cognome: '', indirizzo: '', telefono: '', email: '' },
    vettura: { targa: '', marca: '', modello: '', annoProduzione: new Date().getFullYear(), disponibile: true }
  };

  availableTimes: string[] = [];

  constructor(private appuntamentoService: AppuntamentoService, private router: Router) {}

  ngOnInit(): void {
    this.availableTimes = this.getAvailableTimes();
  }

  getValidStartTime(): string {
    const now = new Date();
    now.setMinutes(Math.ceil(now.getMinutes() / 30) * 30);
    return this.formatDate(now);
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getAvailableTimes(): string[] {
    const times: string[] = [];
    const today = new Date();
    const dayOfWeek = today.getDay();

    let morningStart = new Date();
    let morningEnd = new Date();
    let afternoonStart = new Date();
    let afternoonEnd = new Date();

    if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Lun-Ven
      morningStart.setHours(8, 0, 0, 0);
      morningEnd.setHours(12, 30, 0, 0);
      afternoonStart.setHours(14, 0, 0, 0);
      afternoonEnd.setHours(18, 30, 0, 0);
    } else if (dayOfWeek === 6) { // Sabato
      morningStart.setHours(8, 0, 0, 0);
      morningEnd.setHours(12, 30, 0, 0);
    } else {
      alert("Non puoi prenotare appuntamenti durante il fine settimana.");
      return times;
    }

    // Aggiungi orari del mattino
    for (let time = new Date(morningStart); time <= morningEnd; time.setMinutes(time.getMinutes() + 30)) {
      times.push(this.formatDate(time) + ' ' + time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }

    // Aggiungi orari del pomeriggio se è lunedì-venerdì
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      for (let time = new Date(afternoonStart); time <= afternoonEnd; time.setMinutes(time.getMinutes() + 30)) {
        times.push(this.formatDate(time) + ' ' + time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    }

    return times;
  }

  onSubmit() {
    const inizio = new Date(this.appuntamento.dataOraInizio);
    const fine = new Date(this.appuntamento.dataOraFine);

    // Controllo per evitare appuntamenti fuori dagli orari lavorativi
    if (this.isOutsideWorkingHours(inizio) || this.isOutsideWorkingHours(fine)) {
      if (confirm("Non puoi prenotare appuntamenti fuori dagli orari di apertura. Vuoi tornare alla dashboard?")) {
        this.router.navigate(['/dashboard']);
      }
      return;
    }

    // Verifica che la data di fine sia successiva a quella di inizio
    if (inizio >= fine) {
      alert("La data di fine deve essere successiva a quella di inizio.");
      this.router.navigate(['/dashboard']);
      return;
    }

     // Creazione appuntamento
  this.appuntamentoService.creaAppuntamento(this.appuntamento).subscribe(response => {
    console.log('Appuntamento creato!', response);
    this.resetForm();
    this.router.navigate(['/dashboard']); // Naviga alla dashboard dopo la creazione
  });
}

  isOutsideWorkingHours(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || (day === 6 && date.getHours() >= 12);
  }

  resetForm() {
    this.appuntamento = {
      dataOraInizio: this.getValidStartTime(),
      dataOraFine: this.getValidStartTime(),
      descrizione: '',
      stato: StatoAppuntoType.NUOVO,
      cliente: { nome: '', cognome: '', indirizzo: '', telefono: '', email: '' },
      vettura: { targa: '', marca: '', modello: '', annoProduzione: new Date().getFullYear(), disponibile: true }
    };
  }

  onReturn() {
    this.router.navigate(['/dashboard']);
  }

  closeForm() {
    this.router.navigate(['/dashboard']);
  }
}



