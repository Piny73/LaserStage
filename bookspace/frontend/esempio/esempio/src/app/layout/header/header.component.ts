import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = '';  // Titolo visualizzato nell'header
  showLogin = false;  // Variabile che controlla se il form di login è visibile o no
  email: string = '';  // Variabile per contenere l'email
  password: string = '';  // Variabile per contenere la password

  // Funzione per mostrare o nascondere il form di login
  toggleLogin() {
    this.showLogin = !this.showLogin;
  }

  // Funzione per gestire l'invio del form
  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    // Aggiungi qui la logica per autenticare l'utente, come chiamare un'API
  }
  @Input() titolo: string = ''; 
}
