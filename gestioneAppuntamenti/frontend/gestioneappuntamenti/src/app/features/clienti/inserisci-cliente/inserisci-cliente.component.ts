import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from '../../../core/models/cliente.model';
import { ClienteService } from '../../../core/services/cliente.service';

@Component({
  selector: 'app-inserisci-cliente',
  templateUrl: './inserisci-cliente.component.html',
  styleUrls: ['./inserisci-cliente.component.css']
})
export class InserisciClienteComponent {
  clienteForm: FormGroup;

  constructor(private fb: FormBuilder, private clienteService: ClienteService, private router: Router) {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      indirizzo: [''],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      targa: [''] // Aggiungi altri campi se necessario
    });
  }

  onSubmit(): void {
    if (this.clienteForm.valid) {
      const nuovoCliente = new Cliente(this.clienteForm.value);
      this.clienteService.inserisciCliente(nuovoCliente).subscribe({
        next: () => {
          this.router.navigate(['/clienti']); // Torna alla lista dei clienti
        },
        error: (error) => {
          console.error('Errore nell\'inserimento del cliente:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/clienti']); // Torna alla lista dei clienti
  }
}

