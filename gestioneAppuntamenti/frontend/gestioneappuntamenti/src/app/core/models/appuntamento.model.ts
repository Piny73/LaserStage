export class Appuntamento {
  id!: number;
  data!: Date;
  nota!: string;
  clienteNome!: string;
  vetturaModello!: string;

  constructor(init?: Partial<Appuntamento>) {
    if (init?.data) {
      init.data = new Date(init.data);
    }
    Object.assign(this, init);
  }
}



  