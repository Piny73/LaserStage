import { HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Login } from './models/login.model';
import { User } from './models/user.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly endpoint = 'users/login'; // Endpoint di login

  constructor(private apiService: ApiService, @Inject(PLATFORM_ID) private platformId: Object) {}

  login(login: Login): Observable<any> {
    const loginData = login;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.apiService.post(this.endpoint, loginData, headers).pipe(
      map(response => {
        if (response) {
          this.saveUserInLocalStorage(response);
        }
        return response;
      })
    );
  }

  getUser(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const localUser = localStorage.getItem('user');

      if (localUser) {
        try {
          const user = JSON.parse(localUser);
          if (this.isValidUser(user)?.id) {
            return this.isValidUser(user);
          } else {
            console.log('Error in localStorage data');
            this.logout();
          }
        } catch (e) {
          console.error('Error reading from localStorage:', e);
          this.logout();
        }
      }
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

  private saveUserInLocalStorage(user: User) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(user)); // Salva l'oggetto come stringa JSON
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }
  }
}

