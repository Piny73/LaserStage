import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private encryptionKey: string = 'emily';
  private readonly endpoint = 'users/login';

  constructor(private http: HttpClient, private router: Router) { }

  // Metodo per verificare se localStorage è disponibile
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.encryptionKey).toString();
  }

  private decrypt(data: string): string {
    const bytes = CryptoJS.AES.decrypt(data, this.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  login(login: { email: string; password: string }): Observable<any> {
    const loginData = login;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.endpoint, loginData, { headers }).pipe(
      map(response => {
        if (response && response.token) {
          this.saveUserInLocalStorage(response);
        }
        return response;
      })
    );
  }

  getUser(): User | null {
    if (this.isBrowser()) {
      try {
        const encryptedUser = localStorage.getItem('user');

        if (encryptedUser) {
          const decryptedUser = this.decrypt(encryptedUser);
          try {
            const parsedUser = JSON.parse(decryptedUser);
            if (this.isValidUser(parsedUser)?.id) {
              return this.isValidUser(parsedUser);
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

  private isValidUser(obj: any): User | null {
    if (obj) {
      return {
        id: obj.id,
        version: obj.version,
        email: obj.email,
        first_name: obj.firstname,
        last_name: obj.lastname,
        role: ''
      };
    }
    return null;
  }

  saveUserInLocalStorage(user: any) {
    if (this.isBrowser()) {
      const encryptedUser = this.encrypt(JSON.stringify(user));
      localStorage.setItem('user', encryptedUser);
    }
  }

  isTokenValid(): boolean {
    const token = this.getToken();

    if (token && token.length > 0) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
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

  logout() {
    if (this.isBrowser()) {
      try {
        localStorage.removeItem('user');
      } catch (error) {
        console.error('Error removing user from LocalStorage:', error);
      }
    }
    this.router.navigate(['/login']);
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


