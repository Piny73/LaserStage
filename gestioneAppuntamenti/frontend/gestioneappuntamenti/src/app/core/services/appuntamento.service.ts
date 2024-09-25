import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Appuntamento } from '../models/appuntamento.model';
import { StatoAppuntoType } from '../models/stato-appunto.models';

@Injectable({
    providedIn: 'root'
})
export class AppuntamentoService {
    private apiUrl = 'http://localhost:8080/irina/api/appunti'; // URL base per gli appuntamenti
    private statisticheUrl = 'http://localhost:8080/irina/api/statistiche'; // URL per le statistiche

    private appuntamenti: Appuntamento[] = []; // Array per memorizzare gli appuntamenti

    constructor(private http: HttpClient) { }

    // Ottieni tutti gli appuntamenti
    getAppuntamenti(): Observable<Appuntamento[]> {
        return this.http.get<Appuntamento[]>(this.apiUrl);
    }

    // Ottieni un appuntamento per ID
    getAppuntamentoById(id: number): Observable<Appuntamento> {
        return this.http.get<Appuntamento>(`${this.apiUrl}/${id}`);
    }

    // Crea un nuovo appuntamento
    creaAppuntamento(appuntamento: Appuntamento): Observable<Appuntamento> {
        return this.http.post<Appuntamento>(this.apiUrl, appuntamento);
    }

    // Aggiorna un appuntamento
    aggiornaAppuntamento(id: number, appuntamento: Appuntamento): Observable<Appuntamento> {
        return this.http.put<Appuntamento>(`${this.apiUrl}/${id}`, appuntamento);
    }

    // Elimina un appuntamento
    eliminaAppuntamento(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Modifica lo stato di un appuntamento
    modificaStatoAppuntamento(id: number, nuovoStato: StatoAppuntoType): void {
        const appuntamento = this.appuntamenti.find(app => app.id === id);
        if (appuntamento) {
            appuntamento.stato = nuovoStato;
        }
    }

    // Aggiungi un metodo per caricare gli appuntamenti in memoria
    setAppuntamenti(appuntamenti: Appuntamento[]): void {
        this.appuntamenti = appuntamenti;
    }
}



