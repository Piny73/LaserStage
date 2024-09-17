import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080/irina/api'; // URL base da sua API
  private http = inject(HttpClient);

  constructor() { }

  // Metodo POST
  post(endpoint: string, data: any, headers?: HttpHeaders): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    //console.log("API POST Path: ",  url);
    //console.log("API POST Data: ", data)
    return this.http.post(url, data, { headers });
  }

  // Metodo GET
  get(endpoint: string, headers?: HttpHeaders): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get(url, { headers });
  }

  // Metodo PUT
  put(endpoint: string, data: any, headers?: HttpHeaders): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    console.log("API PUT Path: ",  url);
    console.log("API PUT Data: ", data);
    return this.http.put(url, data, { headers });
  }

  // Metodo DELETE
  delete(endpoint: string,  headers?: HttpHeaders): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.delete(url, { headers });
  }
}

