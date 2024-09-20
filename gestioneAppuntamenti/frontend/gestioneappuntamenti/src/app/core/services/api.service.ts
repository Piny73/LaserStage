import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'api'; // URL di base per le chiamate API

  constructor(private http: HttpClient) {}

  get(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}`);
  }

  post(endpoint: string, data: any, options: { headers?: HttpHeaders } = {}): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data, options);
  }

  // Altri metodi per PUT, DELETE, ecc.
}



