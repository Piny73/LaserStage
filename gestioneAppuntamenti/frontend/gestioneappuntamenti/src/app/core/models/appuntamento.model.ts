import { Cliente } from './cliente.model';
import { Vettura } from './vettura.model';

export interface Appuntamento {
  id?: number;
  dataOraInizio: string; // ISO date format (YYYY-MM-DDTHH:MM:SS)
  dataOraFine: string; // ISO date format (YYYY-MM-DDTHH:MM:SS)
  descrizione: string;
  stato: StatoAppuntoType;
  cliente: Cliente;
  vettura: Vettura;
}

export enum StatoAppuntoType {
  NUOVO = 'NUOVO',
  IN_CORSO = 'IN_CORSO',
  COMPLETATO = 'COMPLETATO',
  ANNULLATO = 'ANNULLATO'
}




  