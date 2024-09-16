import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  title = '';  // Definisci la proprietà title
  showLogin = false;

  toggleLogin() {
    
    this.showLogin = !this.showLogin;  // Alterna la visibilità del form di login
  }
  }
  

