import { Injectable } from '@angular/core';
import { Vettura } from '../models/vettura.model';


@Injectable({
  providedIn: 'root'
})
export class VettureComponentService {
  private vetture: Vettura[] = [];

  getVetture(): Vettura[] {
    return this.vetture;
  }

  addCliente(vettura: Vettura) {
    this.vetture.push(vettura);
  }

  // Altre funzioni come update, delete
}
