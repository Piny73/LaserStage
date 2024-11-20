import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Login } from './models/login.model';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  private readonly endpoint = 'users/login'; //endpoint di login
  private currentUser: User| null=null;

  constructor(private apiService: ApiService) { 
    this.currentUser = this.getUser();
  }

  login(login: Login): Observable<any> {
    const loginData = login;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.apiService.post(this.endpoint, loginData, headers).pipe(
      map(response => {
        if (typeof response === 'string') {
          this.saveUserInLocalStorage(response);
          this.currentUser = this.getUser();
        } else {
          console.error('Errore: il valore di response non è una stringa', response);
        }
        return response;
      })
    );
  }
  getCurrentUser(): User | null {
    return this.currentUser; // Restituisce l'oggetto utente corrente
  }
 

  getUser(): User | null {
    // Ricava l'utente dal localStorage come hai già implementato
    try {
      const localUser = localStorage.getItem('user');

      if (localUser) {
        const parsedUser = JSON.parse(localUser); // Assicurati di fare il parsing
        if (this.isValidUser(parsedUser)) {
          return parsedUser;
        } else {
          console.log('Error localstorage');
          this.logout();
        }
      }
    } catch {
      console.warn('Erro localStore:');
    }
    return null;
  }

  private isValidUser(obj: any): User | null {
    const _user = new User();

    if (obj) {
      _user.id = obj.id;
      _user.name = obj.name;
      _user.email = obj.email;
    }

    return _user;
  }

  saveUserInLocalStorage(user: string) {
    localStorage.setItem('user', user);
  }

  logout() {
    try {
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Localstore Delete:', error);
    }
  }

}
