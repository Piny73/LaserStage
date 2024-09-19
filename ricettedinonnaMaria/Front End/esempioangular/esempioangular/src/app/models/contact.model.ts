// src/app/models/contact.model.ts
export class Contact {
    constructor(
      public nome: string,
      public cognome: string,
      public email: string
    ) {}
  }

  // src/app/models/ricetta.model.ts
export class Ricetta {
  constructor(
    public categoria: string,
    public nome: string,
    public difficolta: string,
    public procedimento: string,
    public tempodiEsecuzione: String,
    public tempodiCottura: String
  ) {}
}


  