import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Officina Meccanica di GP Baudino'; 
  bodyContent: string = ''; // Contenuto del modale

  openModal(modalTitle: string, modalBody: string) {
    this.title = modalTitle; // Aggiorna il titolo del modale
    this.bodyContent = modalBody; // Aggiorna il contenuto del modale
  }
}


