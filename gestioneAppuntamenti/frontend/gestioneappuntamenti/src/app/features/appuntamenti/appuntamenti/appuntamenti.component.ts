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
  /* Metodo per aprire il modal per aggiungere o modificare un appuntamento
  openModal(): void {
    const modalRef = this.modalService.open(YourModalComponent); // Sostituisci con il tuo componente modal
    modalRef.componentInstance.appuntamento = this.selectedAppuntamento; // Passa l'appuntamento selezionato al modal
    modalRef.result.then((result) => {
      if (result) {
        this.caricaAppuntamenti(); // Ricarica gli appuntamenti dopo la chiusura del modal
      }
    });
  }*/

  /* Metodo per modificare un appuntamento
  modificaAppuntamento(appuntamento: Appuntamento): void {
    this.selectedAppuntamento = appuntamento; // Imposta l'appuntamento da modificare
    this.openModal(); // Apri il modal per la modifica
  }*/

  /* Metodo per eliminare un appuntamento
  eliminaAppuntamento(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questo appuntamento?')) {
      this.appuntamentoService.deleteAppuntamento(id).subscribe({
        next: () => {
          this.caricaAppuntamenti(); // Ricarica gli appuntamenti dopo l'eliminazione
        },
        error: (error: any) => {
          console.error('Errore nell\'eliminazione dell\'appuntamento:', error);
        }
      });
    }
  */
  }

