import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appuntamento } from '../models/appuntamento.model';
import { Statistiche } from '../models/statistiche.model'; // Importa il modello Statistiche

@Injectable({
    providedIn: 'root'
})
export class AppuntamentoService {
    private apiUrl = 'http://localhost:8080/irina/api/appunti'; // URL base per gli appuntamenti
    private statisticheUrl = 'http://localhost:8080/irina/api/statistiche'; // URL per le statistiche

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

    // Ottieni statistiche
    getStatistiche(): Observable<Statistiche> {
        return this.http.get<Statistiche>(this.statisticheUrl);
    }
}


