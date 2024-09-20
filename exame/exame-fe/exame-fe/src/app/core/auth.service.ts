import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { User } from './models/user.model';
import { Login } from './models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly endpoint = 'users/login'; //endpoint di login

  constructor(private apiService: ApiService) { }

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
    try{ 
      const localUser = localStorage.getItem('user');

      if (localUser) {
        try {
          if (this.isValidUser(localUser)?.id) {
             return this.isValidUser(localUser);
          } else {
            console.log('Error localstorage');
            this.logout();
          }
        } catch (e) {
          console.error('Erro localstorage:', e);
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
    
    if(obj){
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
    try{
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Localstore Delete:', error);
    }
  }

}
