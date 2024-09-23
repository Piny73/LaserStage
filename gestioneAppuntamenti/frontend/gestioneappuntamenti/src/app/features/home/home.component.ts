import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appuntamento } from '../../core/models/appuntamento.model';
import { AppuntamentoService } from '../../core/services/appuntamento.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  appuntamentiTotali: number = 0;
  appuntamentiOggi: number = 0;
  erroreCaricamento: string | null = null;  // Variabile per gestire gli errori

  constructor(
    private appuntamentoService: AppuntamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.caricaAppuntamenti();
  }

  // Carica tutti gli appuntamenti e calcola quelli di oggi
  private caricaAppuntamenti(): void {
    this.appuntamentoService.getAppuntamenti().subscribe({
      next: (appuntamenti: Appuntamento[]) => {
        this.appuntamentiTotali = appuntamenti.length;
        this.appuntamentiOggi = this.contaAppuntamentiOggi(appuntamenti);
        this.erroreCaricamento = null; // Reset dell'errore in caso di successo
      },
      error: (error) => {
        console.error('Errore nel caricamento degli appuntamenti:', error);
        this.erroreCaricamento = 'Errore nel caricamento degli appuntamenti. Riprova più tardi.';  // Messaggio di errore per l'utente
      }
    });
  }

  // Conta quanti appuntamenti ci sono oggi
  private contaAppuntamentiOggi(appuntamenti: Appuntamento[]): number {
    const oggi = new Date().toISOString().split('T')[0]; // Data corrente formattata

    return appuntamenti.filter(app => {
      const appData = new Date(app.dataOraInizio).toISOString().split('T')[0];
      return appData === oggi;
    }).length;
  }

  // Metodo per la navigazione alla pagina di gestione clienti
  navigateToManageClients(): void {
    this.router.navigate(['/gestisci-clienti']);
  }

  // Metodo per la navigazione alla pagina di creazione appuntamento
  navigateToCreateAppointment(): void {
    this.router.navigate(['/crea-appuntamento']);
  }
}






