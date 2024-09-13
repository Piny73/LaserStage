import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title :string = 'Le ricette di nonna Maria';

  openChangeDialog(risp: string) {
    console.log("ho ricevuto il msg:", risp);
    }
  
}
