export class Contatto {
  indirizzo?: string;
  telefono!: number;
  email!: string;
}

export class Cliente {
  id?: number;
  nome!: string;
  cognome!: string;
  indirizzo?: string;
  targa?: string;
  contatto?: Contatto;  // Cambiato per utilizzare la classe Contatto
  ultimoIntervento?: string;
  prossimiAppuntamenti?: string;

  constructor(init?: Partial<Cliente>) {
    Object.assign(this, init);
  }
}







