import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly endpoint = 'users';
  private userList: User[] = [];

  constructor(
    private apiService: ApiService
  ) { }

  save(_user: User): Observable<User> {
    const _endpoint = this.endpoint;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.apiService.post(_endpoint, _user, headers).pipe(
      map(response => {
        // Salva l'utente anche in localStorage
        this.saveUserToLocalStorage(response);
        return response;
      })
    );
  }

  update(_user: User): Observable<User> {
    const _endpoint = `${this.endpoint}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.apiService.put(_endpoint, _user, headers).pipe(
      map(response => response)
    );
  }

  fill(): Observable<User[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const _endpoint = this.endpoint;

    return this.apiService.get(_endpoint, headers).pipe(
      map((response: any[]) => {
        if (Array.isArray(response)) {
          this.userList = response.map((data: any) => {
            const ac = new User({
              id: data.id,
              name: data.description,
              email: data.dtstart,
              pwd: ""
            });
            return ac;
          });
          return this.userList;
        } else {
          console.error('Resposta da API não é um array');
          return [];
        }
      })
    );
  }

  getUserList(): User[] {
    return this.userList;
  }

  findById(id: number): User | undefined {
    return this.userList.find(u => u.id == id);
  }

  create(_user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.apiService.post(this.endpoint, _user, headers).pipe(
      map(response => {
        this.saveUserToLocalStorage(response); // Salva l'utente anche in localStorage
        return response;
      })
    );
  }

  // Nuovo metodo per salvare l'utente in localStorage
  private saveUserToLocalStorage(user: User) {
    const users = JSON.parse(localStorage.getItem('users') || '[]'); // Ottieni la lista esistente o crea un nuovo array
    users.push(user); // Aggiungi il nuovo utente
    localStorage.setItem('users', JSON.stringify(users)); // Salva di nuovo in localStorage
  }

  // Nuovo metodo per ottenere gli utenti da localStorage
  getUsersFromLocalStorage(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }
}

