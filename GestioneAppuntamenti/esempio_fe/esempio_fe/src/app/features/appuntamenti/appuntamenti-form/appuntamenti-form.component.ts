import { Component } from '@angular/core';
import { Appuntamento } from '../../../core/models/appuntamento.model';
import { AppuntamentoService } from '../../../core/services/appuntamento.service';

@Component({
  selector: 'app-appuntamenti-form',
  templateUrl: './appuntamenti-form.component.html',
  styleUrl: './appuntamenti-form.component.css'
})
export class AppuntamentiFormComponent {
  appuntamento: Appuntamento = {
    data: '',
    clienteNome: '',
    vetturaModello: ''
  };

  constructor(private appuntamentoService: AppuntamentoService) { }

  onSubmit() {
    this.appuntamentoService.addAppuntamento(this.appuntamento).subscribe(response => {
      console.log('Appuntamento aggiunto!', response);
      // Qui si potrebbe anche resettare il modulo dopo l'aggiunta.
    });
  }
}
