import { Cliente } from './cliente.model';
import { StatoAppuntoType } from './stato-appuntamento.model';
import { Vettura } from './vettura.model';

export interface Appuntamento {
  id?: number; // Aggiungi l'ID come proprietà opzionale
  dataOraInizio: string; // Assicurati che sia una stringa nel formato 'YYYY-MM-DDTHH:mm:ss'
  dataOraFine: string; // Assicurati che sia una stringa nel formato 'YYYY-MM-DDTHH:mm:ss'
  descrizione: string;
  stato: StatoAppuntoType;
  cliente: Cliente;
  vettura: Vettura;
}









  