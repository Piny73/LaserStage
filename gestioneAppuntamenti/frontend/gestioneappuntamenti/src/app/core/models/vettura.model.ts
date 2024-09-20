import { Cliente } from './cliente.model';

export interface Vettura {
  id?: number;
  targa: string;
  marca: string;
  modello: string;
  annoProduzione: number;
  disponibile: boolean;
  diesel: boolean;
  benzina: boolean;
  gpl: boolean;
  elettrica: boolean;
  cliente: Cliente;
}

  