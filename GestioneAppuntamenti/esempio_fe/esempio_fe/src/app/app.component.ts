import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Officina Meccanica di GP Baudino';
  isLoginVisible: boolean = false; // Stato del form di login

  openChangeDialog(event: string) {
    console.log("ho ricevuto il msg:", event);
  }
  
  closeLogin() {
    this.isLoginVisible = false; // Nascondi il form di login
  }
}

