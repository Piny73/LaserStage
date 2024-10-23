import { User } from './user.model';

export class Activity {
  id!: number; // Identificatore dell'attività
  description!: string; // Descrizione dell'attività
  dtstart!: string | null; // Data di inizio, può essere null
  dtend!: string | null; // Data di fine, può essere null
  ownerid!: number; // ID del proprietario dell'attività
  enable!: boolean; // Stato dell'attività (attiva o disabilitata)
  owner!: User | null; // Riferimento all'utente proprietario, può essere null
  ownerName?: string; // Campo per il nome del proprietario
  selected?: boolean; // Stato di selezione

  constructor(init?: Partial<Activity>) {
    Object.assign(this, init);
  }
}

export interface ActivityDTO {
  id: number;
  description: string;
  dtstart: string; // Assicurati che sia stringa
  dtend: string; // Assicurati che sia stringa
  ownerid: number;
  enable: boolean;
  ownerName: string;
}
