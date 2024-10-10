import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080/exame/api'; // URL base API
  private http = inject(HttpClient);

  constructor() { }

  // Metodo POST generico
  post<T>(endpoint: string, data: any, headers?: HttpHeaders): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.post<T>(url, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Metodo GET generico
  get<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get<T>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Metodo PUT generico
  put<T>(endpoint: string, data: any, headers?: HttpHeaders): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.put<T>(url, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Metodo DELETE generico
  delete<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.delete<T>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Gestione degli errori
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Errore sconosciuto!';

    // Controllo se siamo in un ambiente client-side
    if (typeof window !== 'undefined' && error.error instanceof ErrorEvent) {
      // Errore lato client
      errorMessage = `Errore: ${error.error.message}`;
    } else {
      // Errore lato server
      errorMessage = `Codice errore: ${error.status}\nMessaggio: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
