import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< Updated upstream
import { map, Observable } from 'rxjs';
=======

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
>>>>>>> Stashed changes
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
<<<<<<< Updated upstream
  private apiUrl = 'http://localhost:8080/clienti';

  constructor(private http: HttpClient) {}

 getClienti(): Observable<Cliente[]> {
  return this.http.get<Cliente[]>('url/api/clienti').pipe(
    map(clienti => clienti.map(cliente => new Cliente(cliente)))  // Assicurati di creare oggetti Cliente correttamente
  );
}

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  creaCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  inserisciCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }
  
  aggiornaCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${cliente.id}`, cliente);
  }

  eliminaCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

=======

  private apiUrl = 'http://localhost:8080/clienti';  // Modifica l'URL in base al tuo backend

  constructor(private http: HttpClient) {}

  getClienti(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${cliente.id}`, cliente);
  }

  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

>>>>>>> Stashed changes
