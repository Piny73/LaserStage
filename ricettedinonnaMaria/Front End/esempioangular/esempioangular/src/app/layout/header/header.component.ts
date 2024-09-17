import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Correzione: styleUrls al plurale
})
export class HeaderComponent {

  @Input("titolo") title?: string;
  @Input() hideLogo: boolean = false;
  @Output("ritorno") back = new EventEmitter<string>();

  showLogin = false; // Variabile per gestire la visibilità del form di login

  onclick() {
    console.log("entrato nel metodo on click");
    this.back.emit("ENTRATO!");
  }

  toggleLogin() {
    // Alterna la visibilità del form di login
    this.showLogin = !this.showLogin;
  }
}

