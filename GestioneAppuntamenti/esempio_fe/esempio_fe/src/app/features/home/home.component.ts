import { Component, OnInit } from '@angular/core';
import { Appuntamento } from '../../core/models/appuntamento.model';
import { AppuntamentoService } from '../../core/services/appuntamento.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  appuntamentiTotali: number = 0;
  appuntamentiOggi: number = 0;

  constructor(private appuntamentoService: AppuntamentoService) {}

  ngOnInit(): void {
    this.caricaAppuntamenti();
  }

  caricaAppuntamenti(): void {
    this.appuntamentoService.getAppuntamenti().subscribe({
      next: (appuntamenti: Appuntamento[]) => {
        this.appuntamentiTotali = appuntamenti.length;

        const oggi = new Date().toISOString().split('T')[0]; // Data di oggi in formato YYYY-MM-DD
        this.appuntamentiOggi = appuntamenti.filter(app => {
          const appData = new Date(app.data).toISOString().split('T')[0];
          return appData === oggi;
        }).length;
      },
      error: (error) => {
        console.error('Errore nel caricamento degli appuntamenti:', error);
        // Gestisci l'errore, ad esempio mostrando un messaggio all'utente
      }
    });
  }
}



