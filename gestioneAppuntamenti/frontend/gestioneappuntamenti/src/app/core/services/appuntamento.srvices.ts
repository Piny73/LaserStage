import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appuntamento } from '../models/appuntamento.model'; // Assicurati di avere il modello importato correttamente

@Injectable({
    providedIn: 'root'
})
export class AppuntamentoService {
    private apiUrl = 'http://localhost:3000/api/appuntamenti'; // URL dell'API, aggiornalo se necessario

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
}
