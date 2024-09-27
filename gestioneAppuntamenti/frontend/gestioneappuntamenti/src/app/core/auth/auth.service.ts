import { HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly loginEndpoint = 'auth/login'; // Endpoint per il login

  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object // Inietta PLATFORM_ID
  ) {}

  // Metodo per il login
  login(email: string, password: string): Observable<void> {
    const loginData = { email, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.apiService.post(this.loginEndpoint, loginData, headers).pipe(
      map(response => {
        if (response && response.token) {
          if (isPlatformBrowser(this.platformId)) { // Verifica se sei nel browser
            localStorage.setItem('authToken', response.token);
          }
        }
      }),
      catchError(error => {
        console.error('Login failed', error);
        throw error;
      })
    );
  }

  // Metodo per il logout
  logout(): void {
    if (isPlatformBrowser(this.platformId)) { // Verifica se sei nel browser
      localStorage.removeItem('authToken');
    }
  }

  // Metodo per verificare se l'utente è autenticato
  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) { // Verifica se sei nel browser
      const token = localStorage.getItem('authToken');
      return !!token;
    }
    return false; // Se sei lato server, l'utente non è considerato autenticato
  }
}

















/*
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly loginEndpoint = 'auth/login'; // Endpoint per il login

  constructor(private apiService: ApiService) { }

  // Metodo per il login
  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Passa il loginEndpoint e i dati al metodo 'post' del ApiService
    return this.apiService.post(this.loginEndpoint, loginData, headers).pipe(
      map(response => {
        // Memorizza il token di autenticazione se presente nella risposta
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
        }
        return response;
      })
    );
  }

  // Metodo per il logout
  logout(): void {
    // Rimuovi il token di autenticazione dal localStorage
    localStorage.removeItem('authToken');
  }

  // Metodo per verificare se l'utente è autenticato
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
*/
