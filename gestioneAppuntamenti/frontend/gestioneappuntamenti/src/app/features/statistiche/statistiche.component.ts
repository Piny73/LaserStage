import { Component, OnInit } from '@angular/core';
import { Vettura } from '../../core/models/vettura.model';
import { VetturaService } from '../../core/services/vettura.service';

@Component({
  selector: 'app-statistiche',
  templateUrl: './statistiche.component.html',
  styleUrls: ['./statistiche.component.css']
})
export class StatisticheComponent implements OnInit {
  totaleVetture: number = 0;
  vettureDisponibili: number = 0;

  constructor(private vetturaService: VetturaService) { }

  ngOnInit(): void {
    this.caricaStatistiche();
  }

  caricaStatistiche(): void {
    this.vetturaService.getVetture().subscribe({
      next: (vetture: Vettura[]) => {
        this.totaleVetture = vetture.length;
        this.vettureDisponibili = vetture.filter(v => v.disponibile).length;
      },
      error: (error) => {
        console.error('Errore nel caricamento delle statistiche:', error);
      }
    });
  }
}

