import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  @Input("titolo") title?: string;
  @Output("ritorno") back = new EventEmitter<string>();

  onclick() {
    console.log("entrato nel metodo on click")
    this.back.emit("ENTRATO!");
    }



}
