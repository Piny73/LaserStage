import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../features/login/login.component';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() title: string = 'Agenda - Officina Meccanica di GP Baudino';
  @Output() ritorno = new EventEmitter<void>();

  constructor(private modalService: NgbModal) { }

  // Emette un evento per la chiusura o il ritorno
  onReturn(): void {
    this.ritorno.emit();
  }

  // Metodo per aprire il modale di login
  openLoginModal(): void {
    const modalRef = this.modalService.open(LoginComponent, { ariaLabelledBy: 'loginModalLabel' });
    modalRef.componentInstance.title = 'Login'; // Puoi anche impostare altre proprietà se necessario
  }

}






