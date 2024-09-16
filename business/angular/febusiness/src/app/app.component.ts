// src/app/app.component.ts
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logged : boolean = false;
  title = 'Business Management System';
  address = 'Via Enzo Migliore - 55, Lessolo - (TO) - By André Lima - 2024';

  onLogin(_logged: boolean) {
    this.logged = _logged;
  }
    
}
