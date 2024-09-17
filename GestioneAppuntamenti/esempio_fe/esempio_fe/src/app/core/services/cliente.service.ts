import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clienti: Cliente[] = [];

  getClienti(): Cliente[] {
    return this.clienti;
  }

  addCliente(cliente: Cliente) {
    this.clienti.push(cliente);
  }

  // Altre funzioni come update, delete
}
