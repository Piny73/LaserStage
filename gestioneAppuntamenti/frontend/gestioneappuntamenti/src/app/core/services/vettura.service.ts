import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vettura } from '../models/vettura.model';

@Injectable({
  providedIn: 'root'
})
export class VetturaService {
  private apiUrl = 'http://localhost:3000/vetture'; // Cambia con l'URL corretto del tuo backend

  constructor(private http: HttpClient) {}

  getVetture(): Observable<Vettura[]> {
    return this.http.get<Vettura[]>(this.apiUrl);
  }

  creaVettura(vettura: Vettura): Observable<Vettura> {
    return this.http.post<Vettura>(this.apiUrl, vettura);
  }

  modificaVettura(vettura: Vettura): Observable<Vettura> {
    return this.http.put<Vettura>(`${this.apiUrl}/${vettura.targa}`, vettura);
  }

  eliminaVettura(targa: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${targa}`);
  }
}


