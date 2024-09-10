import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isCollapsed: boolean = false;
  showDialog: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

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

  isLogged(): boolean {
    try {
      return this.authService.isTokenValid();  
    } catch (error) {
      return false;
    }
  }
}
