import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor() {}

  ngOnInit() {
    // Prendi gli elementi del DOM dopo che il componente è stato caricato
    const modal = document.getElementById('loginModal');
    const btn = document.getElementById('loginButton');
    const span = document.getElementsByClassName('close')[0];

    // Quando clicchi sul bottone, mostra il modale
    btn!.addEventListener('click', () => {
      modal!.style.display = 'block';
    });

    // Quando clicchi sulla "X", chiudi il modale
    span!.addEventListener('click', () => {
      modal!.style.display = 'none';
    });

    // Quando clicchi fuori dal modale, chiudi il modale
    window.addEventListener('click', (event: any) => {
      if (event.target === modal) {
        modal!.style.display = 'none';
      }
    });
  }

  onLogin() {
    // Aggiungi qui la logica per gestire il login
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    // Invia la richiesta di autenticazione al server o gestisci la logica di autenticazione
    // this.authService.login(this.email, this.password).subscribe(...)
  }
}
