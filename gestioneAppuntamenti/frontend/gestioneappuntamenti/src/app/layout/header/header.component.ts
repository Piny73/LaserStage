import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() title: string = 'Agenda - Officina Meccanica di GP Baudino';
  @Output() ritorno = new EventEmitter<void>();

  constructor() {}

  // Emette un evento per la chiusura o il ritorno
  onReturn(): void {
    this.ritorno.emit();
  }
}





