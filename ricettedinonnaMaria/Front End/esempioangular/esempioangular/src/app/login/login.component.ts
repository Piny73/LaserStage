import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor() {}

  onLogin() {
    // Aggiungi qui la logica per gestire il login
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    // Invia la richiesta di autenticazione al server o gestisci la logica di autenticazione
    // this.authService.login(this.username, this.password).subscribe(...)
  }
}


