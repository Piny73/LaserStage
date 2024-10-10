import { Component, OnInit } from '@angular/core';
import { UserService } from './core/services/user.service';
import { User } from './core/models/user.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'exame-fe';
  userList: User[] = []; // Inizializza userList come array vuoto
  selectedItem: number = -1; // Valore predefinito per la selezione

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Ottieni la lista degli utenti quando il componente viene inizializzato
    this.userService.fill().subscribe(
      (data: User[]) => {
        this.userList = data; // Assegna i dati ricevuti a userList
      },
      (error) => {
        console.error('Errore durante il caricamento degli utenti:', error);
      }
    );
  }

  onSelected(event: any): void {
    this.selectedItem = +event.target.value; // Aggiorna il valore selezionato
    console.log('Utente selezionato:', this.selectedItem);
  }
}


