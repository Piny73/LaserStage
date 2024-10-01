import { Component } from '@angular/core';
import { AuthService } from './core/auth/auth.service'; // Importa il servizio di autenticazione

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Officina Meccanica di GP Baudino'; 
  bodyContent: string = ''; // Contenuto del modale
  loginEmail: string = ''; // Email di login
  loginPassword: string = ''; // Password di login

  constructor(private authService: AuthService) {} // Inietta il servizio di autenticazione

  openModal(modalTitle: string, modalBody: string) {
    this.title = modalTitle; // Aggiorna il titolo del modale
    this.bodyContent = modalBody; // Aggiorna il contenuto del modale
  }

  // Metodo per gestire l'invio del form di login
  onSubmit() {
    if (this.loginEmail && this.loginPassword) {
      this.authService.login(this.loginEmail, this.loginPassword).subscribe(
        success => {
          // Se il login ha successo
          console.log('Login avvenuto con successo');
        },
        error => {
          // Gestisci errori di login
          console.error('Errore durante il login', error);
        }
      );
    }
  }
}



