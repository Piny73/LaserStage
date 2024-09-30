
export class Cliente {
  id?: number;
  nome!: string;
  cognome!: string;
  indirizzo?: string;
  telefono!: number;
  email!: string;


  constructor(init?: Partial<Cliente>) {
    Object.assign(this, init);
  }
}



