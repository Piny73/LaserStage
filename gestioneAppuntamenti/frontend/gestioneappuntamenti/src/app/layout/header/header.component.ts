import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() title: string = 'Agenda - Officina Meccanica di GP Baudino';
  @Output() ritorno = new EventEmitter<void>();
  
  loginEmail: string = '';
  loginPassword: string = '';
  isLoggedIn: boolean = false; // Stato di login

  constructor(private authService: AuthService, private router: Router) {}

  onReturn(): void {
    this.ritorno.emit();
  }

  onSubmit(): void {
    this.authService.login(this.loginEmail, this.loginPassword).subscribe({
      next: (response) => {
        if (response && response.token) {
          this.isLoggedIn = true; // Aggiorna lo stato di login
          this.router.navigate(['/home']); // Reindirizza dopo il login
        } else {
          console.error('Login fallito: risposta non valida', response);
        }
      },
      error: (err) => {
        console.error('Errore di login', err);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false; // Aggiorna lo stato di login
  }
}



















