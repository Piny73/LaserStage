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
  
  @ViewChild('loginModal') loginModal!: TemplateRef<any>;

  constructor(private modalService: NgbModal) { }

  onReturn(): void {
    this.ritorno.emit();
  }

  openLoginModal(): void {
    this.modalService.open(this.loginModal, { ariaLabelledBy: 'loginModalLabel' });
  }

  onClose(): void {
    console.log('Modal di login chiuso');
  }
}
















