import { Component, OnInit } from '@angular/core';
import { AppuntamentoService } from '../../core/services/appuntamento.services';
import { Statistiche } from '../../core/models/statistiche.model';

@Component({
  selector: 'app-statistiche',
  templateUrl: './statistiche.component.html',
  styleUrls: ['./statistiche.component.css']
})
export class StatisticheComponent implements OnInit {
  statistica: Statistiche = {
    numeroAppuntamenti: 0,
    tempoMedioAttesa: 0,
    tempoMedioEsecuzione: 0
  };  // Inizializza con valori predefiniti

  constructor(private appuntamentoService: AppuntamentoService) {}

  ngOnInit(): void {
    this.loadStatistiche();
  }

  loadStatistiche(): void {
    this.appuntamentoService.getStatistiche().subscribe(
      (data: Statistiche) => {
        this.statistica = data;  // Assegna direttamente l'oggetto
      },
      (error) => {
        console.error('Errore nel caricamento delle statistiche', error);
      }
    );
  }
}




