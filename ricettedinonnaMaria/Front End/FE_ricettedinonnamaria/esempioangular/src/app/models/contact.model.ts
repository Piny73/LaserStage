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
      public ingredienti: { nome: string; unitaDiMisura: string }[],  // Senza quantità
      public quantita: { quantita: number }[],  // Quantità sarà separata
      public difficolta: string,
      public procedimento: string,
      public tempoDiEsecuzione: string,
      public tempoDiCottura: string,
      public immagini: string[],
    ) {}
  }



  