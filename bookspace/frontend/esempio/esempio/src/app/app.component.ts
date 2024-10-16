import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
title(title: any) {
  throw new Error('Method not implemented.');
}
bookspace: string = "test Sara";

openChangeDialog(resp : string){

  console.log ("ho ricevuto il messaggio:",resp);
}

}