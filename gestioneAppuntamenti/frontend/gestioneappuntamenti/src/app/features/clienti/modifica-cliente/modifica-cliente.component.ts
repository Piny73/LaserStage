import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../../core/models/cliente.model';
import { ClienteService } from '../../../core/services/cliente.service';


@Component({
  selector: 'app-modifica-cliente',
  templateUrl: './modifica-cliente.component.html',
  styleUrls: ['./modifica-cliente.component.css']
})
export class ModificaClienteComponent implements OnInit {
  @Input() cliente!: Cliente;
  clienteForm: FormGroup;
  clienteId!: number;

  constructor(private fb: FormBuilder, private clienteService: ClienteService, private route: ActivatedRoute, private router: Router) {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      indirizzo: [''],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.clienteId = +this.route.snapshot.paramMap.get('id')!;
    this.caricaCliente();
  }

  caricaCliente(): void {
    this.clienteService.getCliente(this.clienteId).subscribe({
      next: (cliente: Cliente) => {
        this.clienteForm.patchValue(cliente);
      },
      error: (error) => {
        console.error('Errore nel caricamento del cliente:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.clienteForm.valid) {
      const updatedCliente = new Cliente({ ...this.clienteForm.value, id: this.clienteId });
      this.clienteService.aggiornaCliente(updatedCliente).subscribe({
        next: () => {
          this.router.navigate(['/clienti']);
        },
        error: (error) => {
          console.error('Errore nell\'aggiornamento del cliente:', error);
        }
      });
    }
  }
  onCancel(): void {
    this.router.navigate(['/clienti']); // Torna alla lista dei clienti
  }
  
}

