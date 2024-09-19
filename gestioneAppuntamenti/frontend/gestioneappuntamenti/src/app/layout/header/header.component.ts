import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input('titolo') title?: string;
  @Output() ritorno = new EventEmitter<string>();

  constructor(private router: Router) {}

  openLoginForm() {
    // Naviga alla pagina di login
    this.router.navigate(['/login']);
  }
}





