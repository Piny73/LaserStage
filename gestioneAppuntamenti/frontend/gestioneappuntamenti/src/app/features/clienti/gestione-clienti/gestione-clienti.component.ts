import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../../../core/models/cliente.model';
import { ClienteService } from '../../../core/services/cliente.service';

@Component({
  selector: 'app-gestione-clienti',
  templateUrl: './gestione-clienti.component.html',
  styleUrls: ['./gestione-clienti.component.css']
})
export class GestioneClientiComponent implements OnInit {
  clienti: Cliente[] = [];

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.caricaClienti();
  }

  caricaClienti(): void {
    this.clienteService.getClienti().subscribe({
      next: (clienti: Cliente[]) => {
        this.clienti = clienti;
      },
      error: (error) => {
        console.error('Errore nel caricamento dei clienti:', error);
      }
    });
  }

  gestisciSelezione(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const valoreSelezionato = selectElement.value;

    switch (valoreSelezionato) {
      case 'inserisci':
        this.apriInserimento(); // Logica per inserire un cliente
        break;
      case 'gestisci':
        this.caricaClienti(); // Ricarica i clienti
        break;
      case 'ricerca':
        this.apriRicerca(); // Implementa la logica per la ricerca
        break;
    }
  }

  apriInserimento(): void {
    this.router.navigate(['/clienti/inserisci']); // Naviga al modulo di inserimento cliente
  }

  apriModifica(cliente: Cliente): void {
    if (cliente.id !== undefined) {
      this.router.navigate(['/clienti/modifica', cliente.id]); // Naviga al modulo di modifica cliente
    } else {
      console.warn('ID cliente non disponibile. Impossibile modificare.');
      // Puoi anche considerare di mostrare un messaggio all'utente
    }
  }

  eliminaCliente(id?: number): void {
    if (id !== undefined) {
      this.clienteService.eliminaCliente(id).subscribe({
        next: () => {
          console.log('Cliente eliminato con successo');
          this.caricaClienti(); // Ricarica la lista dei clienti dopo l'eliminazione
        },
        error: (error) => {
          console.error('Errore nell\'eliminazione del cliente:', error);
        }
      });
    } else {
      console.warn('ID cliente non disponibile. Impossibile eliminare.');
      // Puoi anche considerare di mostrare un messaggio all'utente
    }
  }
  

  apriRicerca(): void {
    this.router.navigate(['/clienti/ricerca']); // Naviga al modulo di ricerca cliente
  }
}


  




