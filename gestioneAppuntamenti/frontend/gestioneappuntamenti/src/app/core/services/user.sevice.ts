import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; // Assicurati di usare il percorso corretto

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://http://localhost:8080/irina/api/users'; // Sostituisci con l'URL del tuo backend

    constructor(private http: HttpClient) { }

    registerUser(user: User): Observable<any> {
        return this.http.post(this.apiUrl, user); // Invia i dati al backend
    }
}

