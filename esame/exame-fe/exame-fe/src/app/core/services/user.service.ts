import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  // Metodo per salvare un nuovo utente
  save(_user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.apiService.post<User>(this.endpoint, _user, headers).pipe(
      map(response => response)
    );
  }

  // Metodo per aggiornare un utente esistente
  update(_user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.apiService.put<User>(this.endpoint, _user, headers).pipe(
      map(response => response)
    );
  }

  // Metodo per ottenere la lista di tutti gli utenti dal backend
  fill(): Observable<User[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.apiService.get<User[]>(this.endpoint, headers).pipe(
      map((response: User[]) => {
        if (Array.isArray(response)) {
          this.userList = response.map((data: User) => {
            return new User({
              id: data.id,
              name: data.name,
              email: data.email,
              pwd: "" // La password non viene mappata per motivi di sicurezza
            });
          });
          return this.userList;
        } else {
          console.error('La risposta dell\'API non è un array');
          return [];
        }
      })
    );
  }

  // Metodo per ottenere la lista di utenti memorizzata localmente
  getUserList(): User[] {
    return this.userList;
  }

  // Metodo per trovare un utente per ID dalla lista locale
  findById(id: number): User | undefined {
    return this.userList.find(u => u.id === id);
  }

  // Metodo per creare un nuovo utente
  create(_user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.apiService.post<User>(this.endpoint, _user, headers).pipe(
      map(response => response)
    );
  }

  // Metodo per ottenere tutti gli utenti direttamente dal backend (senza cache locale)
  getAllUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.apiService.get<User[]>(this.endpoint, headers).pipe(
      map((response: User[]) => {
        return response.map((data: User) => {
          return new User({
            id: data.id,
            name: data.name,
            email: data.email,
            pwd: "" // La password non viene mappata per motivi di sicurezza
          });
        });
      })
    );
  }
}

