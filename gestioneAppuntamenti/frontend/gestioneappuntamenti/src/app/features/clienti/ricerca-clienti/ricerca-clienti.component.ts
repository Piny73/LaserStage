import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../core/models/cliente.model';
import { ClienteService } from '../../../core/services/cliente.service';

@Component({
  selector: 'app-ricerca-clienti',
  templateUrl: './ricerca-clienti.component.html',
  styleUrl: './ricerca-clienti.component.css'
})
export class RicercaClientiComponent implements OnInit {
  clienti: Cliente[] = [];
  searchQuery: string = '';

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {}

  onSearch(): void {
    this.clienteService.getClienti().subscribe(clienti => {
      this.clienti = clienti.filter(cliente => 
        cliente.nome.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        cliente.cognome.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    });
  }
}
