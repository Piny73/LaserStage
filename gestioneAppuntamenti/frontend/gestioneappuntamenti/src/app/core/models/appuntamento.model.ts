import { Cliente } from './cliente.model';
import { StatoAppuntoType } from './stato-appunto.model';
import { Vettura } from './vettura.model';

export class Appuntamento {
  id?: number; 
  dataOraInizio!: string;
  dataOraFine!: string;
  descrizione!: string;
  statoid?: number;
  stato?: StatoAppuntoType;
  clientid?: number;
  cliente?: Cliente;
  vetturaid?: number;
  vettura?: Vettura;

  constructor(init?: Partial<Appuntamento>) {
    Object.assign(this, init);
  }
}









