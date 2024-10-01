import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../core/auth/auth.service';
import { LoginComponent } from '../../features/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = 'Officina Meccanica di GP Baudino';
  isLoggedIn: boolean = false; // Cambia in base alla tua logica di autenticazione

  constructor(private authService: AuthService, private modalService: NgbModal) {
    this.isLoggedIn = this.authService.isAuthenticated(); // Controlla se l'utente è autenticato
  }

  openLoginModal() {
    const modalRef = this.modalService.open(LoginComponent); // Assicurati di avere un componente di login
    modalRef.result.then((result) => {
      if (result) { // Se il login ha avuto successo, aggiorna lo stato
        this.isLoggedIn = true;
      }
    }, (reason) => {
      // Gestisci la chiusura del modale
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false; // Aggiorna lo stato dell'utente
  }
}






















