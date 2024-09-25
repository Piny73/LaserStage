



export class Cliente {
  id?: number;
  nome!: string;
  cognome!: string;
  indirizzo?: string;
  telefono!: number;
  email!: string;
}

constructor(init? : Partial<Cliente>){
  Object.assign(this, init);
}

/* id?: number; //
  dataOraInizio!: string;
  dataOraFine!: string;
  descrizione!: string;
  statoid?: number;
  stato?: StatoAppuntoType;
  clientid?: number
  cliente?: Cliente;
  vetturaid? : number;
  vettura?: Vettura;*/


