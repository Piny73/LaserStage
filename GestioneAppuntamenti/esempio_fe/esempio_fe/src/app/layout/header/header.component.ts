import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
@Input('titolo') title?:string;
@Output('ritorno') back=new EventEmitter<string>(); //è molto utilizzando, scambiare info che usa il browser come passagio



onclick() {
  console.log('entrato nel metodo onclick')
  this.back?.emit('ok')

  }

}
