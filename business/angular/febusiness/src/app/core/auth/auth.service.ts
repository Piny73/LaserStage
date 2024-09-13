import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import CryptoJS from 'crypto-js';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { ApiService } from '../api.service';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private encryptionKey: string = 'clarinha';
  private readonly endpoint = 'users/login'; // login endpoint

  constructor(private apiService: ApiService) { }

  login(login: Login): Observable<any> {
    const loginData = login;
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json'
    });

    return this.apiService.post(this.endpoint, loginData, headers).pipe(
      map(response => {
        if (response && response.token) {
          this.saveUserInLocalStorage(response);
        }
        return response;
      })
    );
  }

  getUser(): User | null {
    try{ 
      const encryptedUser = localStorage.getItem('user');

      if (encryptedUser) {
        const decryptedUser = this.decrypt(encryptedUser);
        try {
          const parsedUser = JSON.parse(decryptedUser);
          if (this.isValidUser(parsedUser)?.id) {
             return this.isValidUser(parsedUser);
          } else {
            console.log('Objeto parseado não corresponde ao tipo User.');
            this.logout();
          }
        } catch (e) {
          console.error('Erro ao parsear os dados do usuário:', e);
          this.logout();
        }
      }
    } catch {
      console.warn('Erro ao acessar LocalStore:');
    }

    return null;
  }

  private isValidUser(obj: any): User | null {
    const _user = new User();
    
    if(obj){
      _user.id = obj.id;
      _user.version = obj.version;
      _user.email = obj.email;
      _user.firstname = obj.firstname;
      _user.lastname = obj.lastname;
      _user.role =  "";
    }

     return _user;
  }

  encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.encryptionKey).toString();
  }

  private decrypt(data: string): string {
    const bytes = CryptoJS.AES.decrypt(data, this.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  saveUserInLocalStorage(user: string) {
    const encryptedUser = this.encrypt(JSON.stringify(user));
    localStorage.setItem('user', encryptedUser);
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    
    if (token && token.length > 0) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        const currentTime = Math.floor(Date.now() / 1000);
  
        if (decodedToken.exp) {
          const expirationDate = new Date(decodedToken.exp * 1000);
          console.log("Data de expiração do token:", expirationDate.toLocaleString()); 
  
          if (decodedToken.exp > currentTime) {
            return true;
          } else {
            console.warn('Token JWT expirado.');
            this.logout();
          }
        }
      } catch (error) {
        console.error('isToken Valid: - Erro ao decodificar o token JWT:', error);
      }
    } else {
      console.warn('isToken Valid: - Usuário ou token JWT não encontrado.');
    }
    return false;
  }

  getToken() : string | null{
    let encryptedUser: string | null;
    let decryptedUser: string | null;

    try{ 
       encryptedUser = localStorage.getItem('user');
       decryptedUser = this.decrypt(encryptedUser!);
       //console.log("Get Token - dati decript: ", decryptedUser);
    }
    catch {
      console.warn('GetToken: - Erro ao acessar LocalStore:');
    }  
    
    if (encryptedUser!) {
      try {
        let parsedUser = JSON.parse(decryptedUser!);
        if (parsedUser.token) {
            return parsedUser.token;
        } else {
          console.log('Objeto parseado não corresponde ao tipo User.');
          return null;
        }
      } catch (e) {
        console.error('Erro ao parsear os dados do usuário:', e);
        return null;
      }
    }
    
    return null;
  }

  logout() {
    try{
      localStorage.removeItem('user');
    } catch (error) {
      console.error('JWT Delete:', error);
    }
  }
  
}
