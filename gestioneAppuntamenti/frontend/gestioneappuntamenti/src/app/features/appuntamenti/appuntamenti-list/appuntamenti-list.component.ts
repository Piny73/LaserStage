import { Component, OnInit } from '@angular/core';
import { Appuntamento } from '../../../core/models/appuntamento.model';
import { AppuntamentoService } from '../../../core/services/appuntamento.service';

@Component({
  selector: 'app-appuntamenti-list',
  templateUrl: './appuntamenti-list.component.html',
  styleUrls: ['./appuntamenti-list.component.css']
})
export class AppuntamentiListComponent implements OnInit {
  appuntamenti: Appuntamento[] = [];

  constructor(private appuntamentoService: AppuntamentoService) { }

  ngOnInit(): void {
    this.loadAppuntamenti();
  }

  loadAppuntamenti(): void {
    this.appuntamentoService.getAppuntamenti().subscribe((data: Appuntamento[]) => {
      // Non cambiare il tipo nel modello, ma puoi convertire le date solo per l'uso lato client
      this.appuntamenti = data.map(app => ({
        ...app,
        dataOraInizio: new Date(app.dataOraInizio).toLocaleString(),  // Converte la stringa ISO in un formato leggibile
        dataOraFine: new Date(app.dataOraFine).toLocaleString()       // Stessa conversione per dataOraFine
      }));
    });
  }
  eliminaAppuntamento(id: number): void {
    this.appuntamentoService.eliminaAppuntamento(id).subscribe({
      next: () => {
        // Rimuovi l'appuntamento dall'elenco locale
        this.appuntamenti = this.appuntamenti.filter(app => app.id !== id);
      },
      error: (error) => {
        console.error('Errore durante l\'eliminazione dell\'appuntamento:', error);
      }
    });
  }

}

  
  


