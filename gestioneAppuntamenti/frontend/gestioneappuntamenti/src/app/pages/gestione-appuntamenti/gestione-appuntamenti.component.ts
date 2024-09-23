import { Component, OnInit } from '@angular/core';
import { Appuntamento } from '../../core/models/appuntamento.model';
import { AppuntamentoService } from '../../core/services/appuntamento.services';

@Component({
  selector: 'app-gestione-appuntamenti',
  templateUrl: './gestione-appuntamenti.component.html',
  styleUrls: ['./gestione-appuntamenti.component.css']
})
export class GestioneAppuntamentiComponent implements OnInit {
  appuntamenti: Appuntamento[] = [];

  constructor(private appuntamentoService: AppuntamentoService) {}

  ngOnInit(): void {
    this.loadAppuntamenti();
  }

  loadAppuntamenti(): void {
    this.appuntamentoService.getAppuntamenti().subscribe(data => {
      this.appuntamenti = data;
    });
  }

  deleteAppuntamento(id: number): void {
    this.appuntamentoService.eliminaAppuntamento(id).subscribe(
      () => {
        console.log('Appuntamento eliminato');
        this.loadAppuntamenti(); // Ricarica la lista degli appuntamenti
      },
      (error) => {
        console.error('Errore nell\'eliminazione dell\'appuntamento', error);
      }
    );
  }
}

