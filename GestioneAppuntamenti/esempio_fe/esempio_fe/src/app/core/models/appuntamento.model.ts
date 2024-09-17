  export class Appuntamento {
    id!: number;
    data!: Date;
    nota!: string;
    vetturaId!: number; // Riferimento alla vettura
  
    constructor(init?: Partial<Appuntamento>) {
      Object.assign(this, init);
    }
  }
  