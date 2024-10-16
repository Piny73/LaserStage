import { Component, OnInit } from '@angular/core';
import { Vettura } from '../../core/models/vettura.model';
import { VetturaService } from '../../core/services/vettura.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  public filtroMarca: string = '';
  public filtroDisponibilita: string = '';
  public vetture: Vettura[] = []; // Assicurati di avere un array di vetture
  public doughnutChartData: any[] = []; // Dati per il grafico, formato corretto
  public colorScheme: any = {
    domain: ['#5AA454', '#E44D25'] // Colori per il grafico
  };

  constructor(private vetturaService: VetturaService) {}

  ngOnInit(): void {
    this.caricaVetture();
  }

  caricaVetture(): void {
    this.vetturaService.getVetture().subscribe({
      next: (vetture: Vettura[]) => {
        this.vetture = vetture;
        this.calcolaStatistiche();
      },
      error: (error) => {
        console.error('Errore nel caricamento delle vetture per il report:', error);
      }
    });
  }

  calcolaStatistiche(): void {
    const disponibili = this.vetture.filter(v => v.disponibile).length;
    const nonDisponibili = this.vetture.length - disponibili;

    // Forma i dati per il grafico
    this.doughnutChartData = [
      { name: 'Disponibili', value: disponibili },
      { name: 'Non Disponibili', value: nonDisponibili }
    ];
  }

  filtraVetture(): void {
    this.vetturaService.getVetture().subscribe({
      next: (vetture: Vettura[]) => {
        this.vetture = vetture.filter(vettura => {
          const matchesMarca = vettura.marca.toLowerCase().includes(this.filtroMarca.toLowerCase());
          const matchesDisponibilita = this.filtroDisponibilita ? 
            (vettura.disponibile === (this.filtroDisponibilita === 'true')) : true;

          return matchesMarca && matchesDisponibilita;
        });
        this.calcolaStatistiche(); // Ricalcola le statistiche dopo il filtro
      },
      error: (error) => {
        console.error('Errore nel filtraggio delle vetture:', error);
      }
    });
  }
}




