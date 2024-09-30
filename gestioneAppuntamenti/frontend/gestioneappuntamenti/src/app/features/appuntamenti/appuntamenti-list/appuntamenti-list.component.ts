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

  constructor(private appuntamentoService: AppuntamentoService) {}

  ngOnInit(): void {
    this.loadAppuntamenti();
  }

  loadAppuntamenti(): void {
    this.appuntamentoService.getAppuntamenti().subscribe((data: Appuntamento[]) => {
      this.appuntamenti = data.map(app => ({
        ...app,
        dataOraInizio: new Date(app.dataOraInizio).toLocaleString(),  
        dataOraFine: new Date(app.dataOraFine).toLocaleString()       
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


  
  


