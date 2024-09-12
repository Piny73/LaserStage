import { Component, EventEmitter, Input, Output } from '@angular/core';
import { emit } from 'process';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
 @Input ("titolo") title?: string ;
 @Output ("ritorno") title2 = new EventEmitter<string>();

 onclick(){

  console.log ("entrato nel metodo onclick")
this.title2?.emit("avanti")
 }

}