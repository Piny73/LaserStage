import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  appuntamentiTotali: number = 0; // Inizializzazione della variabile
  appuntamentiOggi: number = 0;   // Inizializzazione della variabile per gli appuntamenti di oggi

  constructor() {}

  ngOnInit(): void {
    this.caricaAppuntamenti(); // Chiamata per caricare gli appuntamenti
  }

  caricaAppuntamenti(): void {
    // Simulazione di caricamento dati, imposta appuntamentiTotali e appuntamentiOggi
    this.appuntamentiTotali = 10;  // Esempio di valore
    this.appuntamentiOggi = 2;     // Esempio di valore per gli appuntamenti di oggi
  }
}
