
export class Vettura {
  targa! :string;
  marca! :string;
  modello? :string;
  annoProduzione? :number;
  disponibile! :boolean;
  constructor(init?: Partial<Vettura>) {
    Object.assign(this, init);
  }
}


  