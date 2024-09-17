import { Injectable } from '@angular/core';
import { Appuntamento } from '../models/appuntamento.model';


@Injectable({
  providedIn: 'root'
})
export class AppuntamentoService {
  private appuntamenti: Appuntamento[] = [];

  getAppuntamenti(): Appuntamento[] {
    return this.appuntamenti;
  }

  addCliente(appuntamento: Appuntamento) {
    this.appuntamenti.push(appuntamento);
  }

  // Altre funzioni come update, delete
}
