import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../../../core/models/cliente.model';
import { ClienteService } from '../../../core/services/cliente.service';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.css']
})
export class ClientiComponent implements OnInit {
  clienti: Cliente[] = [];
  clientiFiltrati: Cliente[] = []; // Lista filtrata per la ricerca
  searchTerm: string = ''; // Termini di ricerca
  clienteSelezionato: Cliente | null = null;

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.caricaClienti();
  }

  caricaClienti(): void {
    this.clienteService.getClienti().subscribe({
      next: (clienti: Cliente[]) => {
        this.clienti = clienti;
        this.clientiFiltrati = clienti; // Inizialmente mostra tutti i clienti
      },
      error: (error) => {
        console.error('Errore nel caricamento dei clienti:', error);
      }
    });
  }

  cercaClienti(): void {
    if (this.searchTerm) {
      this.clientiFiltrati = this.clienti.filter(cliente =>
        cliente.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        cliente.cognome.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.clientiFiltrati = this.clienti; // Se non ci sono termini di ricerca, mostra tutti i clienti
    }
  }

  eliminaCliente(clienteId?: number): void {
    if (clienteId !== undefined) {
      this.clienteService.eliminaCliente(clienteId).subscribe({
        next: () => {
          // Rimuovi il cliente dalla lista locale
          this.clienti = this.clienti.filter(cliente => cliente.id !== clienteId);
          this.cercaClienti(); // Rinfresca la lista filtrata
          console.log('Cliente eliminato con successo:', clienteId);
        },
        error: (error) => {
          console.error('Errore nell\'eliminazione del cliente:', error);
        }
      });
    } else {
      console.error('Cliente non valido');
    }
  }

  apriModificaCliente(): void {
    this.clienteSelezionato = {} as Cliente; // Inizializza un nuovo cliente
  }

  modificaCliente(cliente: Cliente): void {
    this.clienteSelezionato = cliente; // Imposta il cliente selezionato per la modifica
  }
}

