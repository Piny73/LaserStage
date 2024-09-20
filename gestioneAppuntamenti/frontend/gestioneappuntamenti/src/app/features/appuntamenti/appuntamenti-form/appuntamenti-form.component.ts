import { Component } from '@angular/core';
import { Appuntamento } from '../../../core/models/appuntamento.model';
import { AppuntamentoService } from '../../../core/services/api.service.ts';

@Component({
  selector: 'app-appuntamenti-form',
  templateUrl: './appuntamenti-form.component.html',
  styleUrls: ['./appuntamenti-form.component.css']
})
export class AppuntamentiFormComponent {
  appuntamento: Appuntamento = new Appuntamento(); // Usa il costruttore della classe

  constructor(private appuntamentoService: AppuntamentoService) { }

  onSubmit() {
    if (!(this.appuntamento.data instanceof Date)) {
      this.appuntamento.data = new Date(this.appuntamento.data);
    }

    this.appuntamentoService.addAppuntamento(this.appuntamento).subscribe(response => {
      console.log('Appuntamento aggiunto!', response);
      this.resetForm();
    });
  }

  resetForm() {
    this.appuntamento = new Appuntamento({
      data: new Date(),
      clienteNome: '',
      vetturaModello: ''
    });
  }
}



