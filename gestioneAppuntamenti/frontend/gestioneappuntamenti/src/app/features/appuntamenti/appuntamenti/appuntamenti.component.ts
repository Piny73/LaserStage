import { Component, OnInit } from '@angular/core';
import { Appuntamento } from '../../../core/models/appuntamento.model';
import { AppuntamentoService } from '../../../core/services/appuntamento.service';

@Component({
  selector: 'app-appuntamenti',
  templateUrl: './appuntamenti.component.html',
  styleUrls: ['./appuntamenti.component.css']
})
export class AppuntamentiComponent implements OnInit {
  appuntamenti: Appuntamento[] = []; // Proprietà per memorizzare gli appuntamenti
  selectedAppuntamento: Appuntamento | null = null; // Proprietà per l'appuntamento selezionato
  constructor(private appuntamentoService: AppuntamentoService) { }

  ngOnInit(): void {
    this.caricaAppuntamenti();
  }

  // Metodo per caricare gli appuntamenti
  caricaAppuntamenti(): void {
    this.appuntamentoService.getAppuntamenti().subscribe({
      next: (data: Appuntamento[]) => {
        this.appuntamenti = data; // Assegna i dati alla proprietà
      },
      error: (error) => {
        console.error('Errore nel caricamento degli appuntamenti:', error);
      }
    });
  }

  // Metodo per selezionare un appuntamento
  onSelect(appuntamento: Appuntamento): void {
    this.selectedAppuntamento = appuntamento; // Assegna l'appuntamento selezionato
  }
}
