import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  constructor(private router: Router) {}

  logout() {
    // Esegui eventuali operazioni di pulizia, ad esempio rimuovere il token di autenticazione
    localStorage.removeItem('authToken'); // Se stai usando il localStorage per salvare il token

    // Reindirizza alla pagina di login
    this.router.navigate(['/login']);
  }
}

