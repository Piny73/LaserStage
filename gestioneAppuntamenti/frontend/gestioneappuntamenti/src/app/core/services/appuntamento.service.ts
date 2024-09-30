import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Appuntamento } from '../models/appuntamento.model';
import { StatoAppuntoType } from '../models/stato-appunto.model';

@Injectable({
    providedIn: 'root'
})
export class AppuntamentoService {
    private readonly endpoint = 'appunti';  //nel backend ho appunti e non appunatamenti
    private appuntamentoList: Appuntamento[] = [];
    private selectedAppuntamento: Appuntamento = new Appuntamento();

    constructor(private http: HttpClient, private apiService: ApiService) { }

    // Ottieni tutti gli appuntamenti
    getAppuntamenti(): Observable<Appuntamento[]> {
        return this.http.get<Appuntamento[]>(`${this.apiService.baseUrl}/${this.endpoint}`);
    }

    // Ottieni un appuntamento per ID
    getAppuntamentoById(id: number): Observable<Appuntamento> {
        return this.http.get<Appuntamento>(`${this.apiService.baseUrl}/${this.endpoint}/${id}`);
    }

    // Crea un nuovo appuntamento
    creaAppuntamento(appuntamento: Appuntamento): Observable<Appuntamento> {
        return this.http.post<Appuntamento>(`${this.apiService.baseUrl}/${this.endpoint}`, appuntamento);
    }

    // Aggiorna un appuntamento
    aggiornaAppuntamento(id: number, appuntamento: Appuntamento): Observable<Appuntamento> {
        return this.http.put<Appuntamento>(`${this.apiService.baseUrl}/${this.endpoint}/${id}`, appuntamento);
    }

    // Elimina un appuntamento
    eliminaAppuntamento(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiService.baseUrl}/${this.endpoint}/${id}`);
    }

    // Modifica lo stato di un appuntamento
    modificaStatoAppuntamento(id: number, nuovoStato: StatoAppuntoType): void {
        const appuntamento = this.appuntamentoList.find(app => app.id === id);
        if (appuntamento) {
            appuntamento.stato = nuovoStato;
        }
    }

    // Aggiungi un metodo per caricare gli appuntamenti in memoria
    setAppuntamenti(appuntamenti: Appuntamento[]): void {
        this.appuntamentoList = appuntamenti;
    }
}




    /*
    constructor(
        private apiService: ApiService
    ) { }

    getAppuntamentoList(): Observable<Appuntamento[]> {
        return this.fill();
    }

    getSelectedAppuntamento(): Appuntamento {
        return this.selectedAppuntamento;
    }

    fill(): Observable<Appuntamento[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.apiService.get(this.endpoint, headers).pipe(
            map((response: any[]) => {
                if (Array.isArray(response)) {
                    this.appuntamentoList = response.map((data: any) => {
                        return new Appuntamento({
                            id: data.id,
                            dataOraInizio: data.dataOraInizio, // Assicurati che corrisponda alla risposta API
                            dataOraFine: data.dataOraFine,
                            descrizione: data.descrizione,
                            statoid: data.statoid,
                            clientid: data.clientid,
                            vetturaid: data.vetturaid,
                            // Se il cliente e la vettura sono oggetti, mappa anche i loro attributi se necessario
                            cliente: data.cliente ? new Cliente(data.cliente) : undefined,
                            vettura: data.vettura ? new Vettura(data.vettura) : undefined
                        });
                    });
                    this.setMainAppuntamento();
                } else {
                    console.error('La risposta API non è un array');
                }
                return this.appuntamentoList;
            })
        );
    }

    setMainAppuntamento(): void {
        if (this.appuntamentoList.length > 0) {
            this.selectedAppuntamento = this.appuntamentoList[0]; // Adatta qui se vuoi usare una logica diversa
        } else {
            this.selectedAppuntamento = new Appuntamento();
        }
    }

    changeMainAppuntamento(appuntamento: Appuntamento): void {
        this.selectedAppuntamento = { ...appuntamento };
    }

    update(appuntamento: Appuntamento): Observable<Appuntamento> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.apiService.put(`${this.endpoint}/${appuntamento.id}`, appuntamento, headers).pipe(
            map(response => {
                if (response) {
                    console.log("Aggiornamento riuscito");
                }
                return response;
            })
        );
    }

    create(appuntamento: Appuntamento): Observable<Appuntamento> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.apiService.post(this.endpoint, appuntamento, headers).pipe(
            map(response => {
                if (response) {
                    console.log("Creazione riuscita");
                }
                return response;
            })
        );
    }
    
    delete(id: number): Observable<void> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.apiService.delete(`${this.endpoint}/${id}`, headers).pipe(
            map(response => {
                console.log("Eliminazione riuscita");
                return response; // Potresti anche voler ritornare un valore specifico qui
            })
        );
    }

    findAppuntamentoById(id: number): Appuntamento | undefined {
        return this.appuntamentoList.find(app => app.id === id);
    }
}

*/


