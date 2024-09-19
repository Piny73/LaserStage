import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Appuntamento } from '../models/appuntamento.model';

@Injectable({
  providedIn: 'root'
})
export class AppuntamentoService {
  private appuntamenti: Appuntamento[] = [];

  getAppuntamenti(): Observable<Appuntamento[]> {
    return of(this.appuntamenti);
  }

  addAppuntamento(appuntamento: Appuntamento): Observable<Appuntamento> {
    this.appuntamenti.push(appuntamento);
    return of(appuntamento);
  }

  // Altre funzioni come update, delete
}

