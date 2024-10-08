import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080/exame/api'; // URL base API
  private http = inject(HttpClient);

  constructor() { }

  // Método POST genérico
  post(endpoint: string, data: any, headers?: HttpHeaders): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    //console.log("API POST Path: ",  url);
    //console.log("API POST Data: ", data)
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
    console.log("API PUT Path: ",  url);
    console.log("API PUT Data: ", data);
    return this.http.put(url, data, { headers });
  }

  // Método DELETE genérico
  delete(endpoint: string,  headers?: HttpHeaders): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.delete(url, { headers });
  }
}

