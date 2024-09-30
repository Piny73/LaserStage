import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed: boolean = false;
  showDialog: boolean = false;
  isAuthenticated: boolean = false; // Aggiunta proprietà per gestire lo stato di autenticazione

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated(); // Verifica lo stato di autenticazione al caricamento
  }

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  openLogoutDialog(event: Event) {
    event.preventDefault();
    this.showDialog = true;
  }

  confirmLogout() {
    this.authService.logout();
    this.showDialog = false;
    this.router.navigate(['']);
  }

  cancelLogout() {
    this.showDialog = false;
  }
}

