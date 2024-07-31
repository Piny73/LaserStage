import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080/bookspace/api'; // URL base da sua API

  constructor(private http: HttpClient) { }

  // Método POST genérico
  post(endpoint: string, data: any, headers?: HttpHeaders): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.post(url, data, { headers });
  }

  // Método GET genérico
  get(endpoint: string, headers?: HttpHeaders): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get(url, { headers });
  }

  // Método PUT genérico
  put(endpoint: string, data: any, headers?: HttpHeaders): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.put(url, data, { headers });
  }

  // Método DELETE genérico
  delete(endpoint: string, headers?: HttpHeaders): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.delete(url, { headers });
  }
}

