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

  // Metodo per ottenere gli utenti dal backend
  fill(): Observable<User[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const _endpoint = this.endpoint;

    return this.apiService.get(_endpoint, headers).pipe(
      map((response: any[]) => {
        if (Array.isArray(response)) {
          this.userList = response.map((data: any) => {
            const user = new User({
              id: data.id,
              name: data.name, // Aggiornato per riflettere il modello del backend
              email: data.email,
              pwd: ""
            });
            return user;
          });

          // Salva anche la lista degli utenti in localStorage
          this.saveUsersToLocalStorage(this.userList);
          return this.userList;
        } else {
          console.error('La risposta della API non è un array');
          return [];
        }
      })
    );
  }

  // Metodo per salvare un nuovo utente nel backend
  save(_user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.apiService.post(this.endpoint, _user, headers).pipe(
      map(response => {
        // Salva l'utente anche in localStorage
        this.saveUserToLocalStorage(response);
        return response;
      })
    );
  }

  // Metodo per aggiornare un utente esistente
  update(_user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.apiService.put(this.endpoint, _user, headers).pipe(
      map(response => response)
    );
  }

  // Metodo per ottenere gli utenti salvati localmente
  getUserList(): User[] {
    return this.userList.length ? this.userList : this.getUsersFromLocalStorage();
  }

  // Metodo per trovare un utente per ID dalla lista caricata
  findById(id: number): User | undefined {
    return this.userList.find(u => u.id === id);
  }

  // Metodo per creare un nuovo utente nel backend
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

  // Metodo per salvare un singolo utente in localStorage
  private saveUserToLocalStorage(user: User): void {
    const users = this.getUsersFromLocalStorage();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  // Metodo per salvare l'intera lista degli utenti in localStorage
  private saveUsersToLocalStorage(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  // Metodo per ottenere gli utenti da localStorage
  getUsersFromLocalStorage(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }
}


