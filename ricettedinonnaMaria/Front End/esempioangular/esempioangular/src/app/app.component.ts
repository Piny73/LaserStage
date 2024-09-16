import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title :string = '';

  openChangeDialog(risp: string) {
    console.log("ho ricevuto il msg:", risp);
    }
  
}
