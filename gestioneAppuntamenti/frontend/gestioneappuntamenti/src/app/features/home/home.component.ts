import { Component, OnInit } from '@angular/core';
import { Appuntamento } from '../../core/models/appuntamento.model';
import { AppuntamentoService } from '../../core/services/appuntamento.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  appuntamentiTotali: number = 0;         // Numero totale di appuntamenti
  appuntamentiOggi: number = 0;            // Numero di appuntamenti per oggi
  erroreCaricamento: string | null = null;  // Variabile per gestire gli errori

  constructor(private appuntamentoService: AppuntamentoService) {}

  ngOnInit(): void {
    this.caricaAppuntamenti();
  }

  // Carica tutti gli appuntamenti e calcola quelli di oggi
  private caricaAppuntamenti(): void {
    this.appuntamentoService.getAppuntamenti().subscribe({
      next: (appuntamenti: Appuntamento[]) => {
        this.appuntamentiTotali = appuntamenti.length; // Imposta il numero totale di appuntamenti
        this.appuntamentiOggi = this.contaAppuntamentiOggi(appuntamenti); // Conta gli appuntamenti di oggi
        this.erroreCaricamento = null; // Reset dell'errore in caso di successo
      },
      error: (error: any) => { // Specifica il tipo di errore
        console.error('Errore nel caricamento degli appuntamenti:', error);
        this.erroreCaricamento = 'Errore nel caricamento degli appuntamenti. Riprova più tardi.';  // Messaggio di errore per l'utente
      }
    });
  }

  // Conta quanti appuntamenti ci sono oggi
  private contaAppuntamentiOggi(appuntamenti: Appuntamento[]): number {
    const oggi = new Date().toISOString().split('T')[0]; // Data corrente formattata (YYYY-MM-DD)

    return appuntamenti.filter(app => {
      const appData = new Date(app.dataOraInizio).toISOString().split('T')[0]; // Estrae la data dall'appuntamento
      return appData === oggi; // Confronta la data
    }).length; // Restituisce il conteggio degli appuntamenti di oggi
  }
}













