import { Activity } from "./activity.model";
import { User } from "./user.model";

export class TimeSheet {
  id!: number;                      // Identificatore univoco del Timesheet
  activityId!: number | null;       // ID dell'attività associata, ora accetta null
  userId!: number | null;           // ID dell'utente, ora accetta null
  detail!: string;                  // Dettagli del lavoro svolto
  dtstart!: string | null;          // Data e ora di inizio
  dtend!: string | null;            // Data e ora di fine
  user!: User;                      // Oggetto utente associato
  activity!: Activity;              // Oggetto attività associata


  constructor(init?: Partial<TimeSheet>) {
    Object.assign(this, init);      // Assegna valori iniziali se forniti
  }
}

export interface TimeSheetDTO {
  id: number;                      // Identificatore del Timesheet
  activityId: number | null;       // ID dell'attività associata, ora accetta null
  userId: number | null;           // ID dell'utente, ora accetta null
  dtstart: string | null;          // Data e ora di inizio
  dtend: string | null;            // Data e ora di fine
  detail: string;                  // Dettagli del lavoro svolto

}

