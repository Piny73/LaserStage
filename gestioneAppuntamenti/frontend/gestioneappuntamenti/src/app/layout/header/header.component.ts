// HeaderComponent
import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() title: string = 'Agenda - Officina Meccanica di GP Baudino';
  @Output() ritorno = new EventEmitter<void>();
  
  @ViewChild('loginModal') loginModal!: TemplateRef<any>; // Aggiungi questa riga

  constructor(private modalService: NgbModal) { }

  // Emette un evento per la chiusura o il ritorno
  onReturn(): void {
    this.ritorno.emit();
  }

  // Metodo per aprire il modale di login
  openLoginModal(): void {
    this.modalService.open(this.loginModal, { ariaLabelledBy: 'loginModalLabel' }); // Usa il template
  }

  onClose(): void {
    console.log('Modal di login chiuso');
    // Qui puoi anche chiudere il modale se necessario
  }
}








