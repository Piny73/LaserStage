
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly loginEndpoint = 'users/login'; // Definindo o endpoint para login

  constructor(private apiService: ApiService) { }

  login(usr: string, pwd: string): Observable<any> {
    const loginData = { usr, pwd };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Passa o endpoint 'login' e os dados para o método 'post' do ApiService
    return this.apiService.post(this.loginEndpoint, loginData, headers).pipe(
      map(response => {
        // Armazenar token ou outros dados de sessão se necessário
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
        }
        return response;
      })
    );
  }

  logout(): void {
    // Implementar a lógica de logout (por exemplo, remover o token do localStorage)
    localStorage.removeItem('authToken');
  }
}

