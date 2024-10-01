import { Component, OnInit } from '@angular/core';
import { Vettura } from '../../core/models/vettura.model';
import { VetturaService } from '../../core/services/vettura.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  vetture: Vettura[] = [];
  filtroMarca: string = '';
  filtroDisponibilita: string = '';

  // Configurazione del grafico
  public doughnutChartLabels: string[] = ['Disponibile', 'Non Disponibile'];
  public doughnutChartData: number[] = [0, 0];
  public doughnutChartType: string = 'doughnut';

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

    this.doughnutChartData = [disponibili, nonDisponibili];
  }

  filtraVetture(): void {
    this.vetturaService.getVetture().subscribe({
      next: (vetture: Vettura[]) => {
        this.vetture = vetture.filter(vettura => {
          const matchesMarca = vettura.marca.toLowerCase().includes(this.filtroMarca.toLowerCase());
          const matchesDisponibilita = this.filtroDisponibilita ? 
            (vettura.disponibile === (this.filtroDisponibilita === 'true')) : true;

          return matchesMarca && matchesDi


