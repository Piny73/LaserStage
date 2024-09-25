import { Cliente } from './cliente.model';
import { StatoAppuntoType } from './stato-appunto.models';

import { Vettura } from './vettura.model';

export class Appuntamento {
  id?: number; // Aggiungi l'ID come proprietà opzionale
  dataOraInizio!: string; // Assicurati che sia una stringa nel formato 'YYYY-MM-DDTHH:mm:ss'
  dataOraFine!: string; // Assicurati che sia una stringa nel formato 'YYYY-MM-DDTHH:mm:ss'
  descrizione!: string;
  statoid?: number;
  stato?: StatoAppuntoType;
  clientid?: number
  cliente?: Cliente;
  vetturaid? : number;
  vettura?: Vettura;

  constructor(init? : Partial<Appuntamento>){
    Object.assign(this, init);
  }


}









  