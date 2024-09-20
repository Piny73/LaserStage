import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private readonly encryptionKey = 'emily'; // Sostituisci con una chiave sicura
  private readonly loginEndpoint = 'users/login'; // Endpoint per il login, aggiornalo se necessario

  constructor(private http: HttpClient) {}

  // Metodo per crittografare i dati
  encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.encryptionKey).toString();
  }

  // Metodo per decrittografare i dati
  private decrypt(data: string): string {
    const bytes = CryptoJS.AES.decrypt(data, this.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  // Metodo per effettuare il login
  login(loginData: { email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.loginEndpoint, loginData, { headers }).pipe(
      map(response => {
        if (response && response.token) {
          this.saveUserInLocalStorage(response);
        }
        return response;
      })
    );
  }

  // Metodo per ottenere l'utente memorizzato
  getUser(): any | null {
    if (this.isBrowser()) {
      try {
        const encryptedUser = localStorage.getItem('user');

        if (encryptedUser) {
          const decryptedUser = this.decrypt(encryptedUser);
          try {
            const parsedUser = JSON.parse(decryptedUser);
            if (this.isValidUser(parsedUser)) {
              return parsedUser;
            } else {
              console.log('Parsed object does not match User type.');
              this.logout();
            }
          } catch (e) {
            console.error('Error parsing user data:', e);
            this.logout();
          }
        }
      } catch {
        console.warn('Error accessing LocalStorage.');
      }
    }
    return null;
  }

  // Metodo per salvare l'utente in localStorage
  private saveUserInLocalStorage(user: any) {
    if (this.isBrowser()) {
      const encryptedUser = this.encrypt(JSON.stringify(user));
      localStorage.setItem('user', encryptedUser);
    }
  }

  // Metodo per verificare se il token è valido
  isTokenValid(): boolean {
    const token = this.getToken();

    if (token && token.length > 0) {
      try {
        const decodedToken = jwtDecode<any>(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp) {
          const expirationDate = new Date(decodedToken.exp * 1000);
          console.log("Token expiration date:", expirationDate.toLocaleString());

          if (decodedToken.exp > currentTime) {
            return true;
          } else {
            console.warn('JWT token expired.');
            this.logout();
          }
        }
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    } else {
      console.warn('User or JWT token not found.');
    }
    return false;
  }

  // Metodo per ottenere il token
  getToken(): string | null {
    if (this.isBrowser()) {
      const encryptedUser = localStorage.getItem('user');

      if (encryptedUser) {
        try {
          const decryptedUser = this.decrypt(encryptedUser);
          const parsedUser = JSON.parse(decryptedUser);
          return parsedUser.token || null;
        } catch (e) {
          console.error('Error parsing user data:', e);
          return null;
        }
      }
    }
    return null;
  }

  // Metodo per eseguire il logout
  logout() {
    if (this.isBrowser()) {
      try {
        localStorage.removeItem('user');
      } catch (error) {
        console.error('Error removing user from LocalStorage:', error);
      }
    }
    // Naviga alla pagina di login, assicurati di avere Router importato e configurato
    // this.router.navigate(['/login']);
  }

  // Verifica se l'ambiente è un browser
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  // Verifica se un oggetto è valido (personalizza in base al tuo modello di User)
  private isValidUser(obj: any): boolean {
    return obj && obj.id && obj.email; // Aggiungi ulteriori verifiche in base al tuo modello di User
  }
}





  

/*
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4200'; // URL del tuo backend
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.token = localStorage.getItem('token'); // Recupera il token da localStorage al momento della creazione del servizio
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password });
  }

  handleLogin(email: string, password: string) {
    this.login(email, password).subscribe(
      response => {
        this.token = response.token;
        localStorage.setItem('token', this.token);
        this.router.navigate(['/']); // Redirigi l'utente dopo il login
      },
      error => {
        alert('Errore durante il login: ' + error.error);
      }
    );
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.token !== null;
  }

  isTokenValid(): boolean {
    // Verifica se il token esiste e, se necessario, implementa una logica per verificare la sua validità
    return this.token !== null; // Puoi estendere questa logica per controlli più complessi
  }
}

    */


