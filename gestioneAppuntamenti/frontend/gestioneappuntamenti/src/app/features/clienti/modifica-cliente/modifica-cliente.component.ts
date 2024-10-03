import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() cliente!: Cliente;  // Aggiunto decoratore @Input per ricevere i dati del cliente
  @Output() chiudi = new EventEmitter<void>();  // Aggiunta per emettere l'evento di chiusura
  clienteForm: FormGroup;  // FormGroup per il cliente
  clienteId!: number;      // ID del cliente da modificare

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Inizializza il form del cliente
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      indirizzo: [''],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    // Se il cliente non è stato passato come input, ottieni l'ID dal parametro della rotta
    if (!this.cliente) {
      this.clienteId = +this.route.snapshot.paramMap.get('id')!;  // Ottiene l'ID dal parametro della rotta
      this.caricaCliente();  // Carica i dati del cliente
    } else {
      this.clienteForm.patchValue(this.cliente);  // Imposta i valori del form con i dati del cliente
    }
  }

  // Carica i dati del cliente dal servizio
  caricaCliente(): void {
    this.clienteService.getCliente(this.clienteId).subscribe({
      next: (cliente: Cliente) => {
        this.clienteForm.patchValue(cliente);  // Imposta i valori del form con i dati del cliente
      },
      error: (error) => {
        console.error('Errore nel caricamento del cliente:', error);
      }
    });
  }

  // Invia il form per aggiornare il cliente
  onSubmit(): void {
    if (this.clienteForm.valid) {
      const updatedCliente = new Cliente({ ...this.clienteForm.value, id: this.clienteId });
      this.clienteService.aggiornaCliente(updatedCliente).subscribe({
        next: () => {
          this.router.navigate(['/clienti']);  // Naviga alla lista dei clienti dopo l'aggiornamento
        },
        error: (error) => {
          console.error('Errore nell\'aggiornamento del cliente:', error);
        }
      });
    }
  }

  // Torna alla lista dei clienti senza modificare
  onCancel(): void {
    this.chiudi.emit();  // Emette l'evento di chiusura
    this.router.navigate(['/clienti']);
  }
}






