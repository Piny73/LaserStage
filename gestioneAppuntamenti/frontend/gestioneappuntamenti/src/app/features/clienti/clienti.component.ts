import { Component } from '@angular/core';
import { Cliente } from '../../core/models/cliente.model';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.css']
})
export class ClientiComponent {
  clienti: Cliente[] = [];
  selectedCliente: Cliente | null = null;

  constructor() {
    // Inizializza i clienti se necessario
  }

  addCliente() {
    this.selectedCliente = new Cliente({ id: 0, nome: '', cognome: '', telefono: 0, email: '' });
  }

  selectCliente(cliente: Cliente) {
    this.selectedCliente = { ...cliente };
  }

  deleteCliente(email: string) {
    const index = this.clienti.findIndex(cliente => cliente.email === email);
    if (index !== -1) {
      this.clienti.splice(index, 1);
    }
  }

  onSubmit() {
    if (this.selectedCliente) { // Verifica che selectedCliente non sia null
      if (!this.selectedCliente.email) { // Controlla se l'email è vuota per determinare se è un nuovo cliente
        // Aggiungi il nuovo cliente
        this.clienti.push({ ...this.selectedCliente, email: this.clienti.length + 1 }); //email
      } else {
        // Modifica un cliente esistente
        const index = this.clienti.findIndex(cliente => cliente.email === this.selectedCliente.email);
        if (index !== -1) {
          this.clienti[index] = { ...this.selectedCliente };
        }
      }
      this.selectedCliente = null; // Resetta il cliente selezionato
    }
  }

  someMethod() {
    if (this.selectedCliente) {
      const index = this.clienti.findIndex(cliente => cliente.email === this.selectedCliente.email);
      // Ulteriori logiche...
    }
  }
}






