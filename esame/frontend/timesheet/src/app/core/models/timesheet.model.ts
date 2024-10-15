import { Activity } from "./activity.model";
import { User } from "./user.model";

export class TimeSheet {
  id! : number
  activityid! : number;
  userid! : number;
  detail!: string;
  dtstart!: string | null;
  dtend!: string | null;
  user!: User;
  activity! : Activity;
  
  constructor(init?: Partial<TimeSheet>) {
    Object.assign(this, init);
  }
}

export interface TimeSheetDTO {
  id: number;
  activityid: number;
  userid: number;
  dtstart: string | null; // Modificato per accettare stringa o null
  dtend: string | null;   // Modificato per accettare stringa o null
  detail: string;
}



  
  // Metodo per calcolare la durata tra dtstart e dtend
  /*getDurationInHours(): number {
    if (this.dtstart && this.dtend) {
      const start = new Date(this.dtstart).getTime();
      const end = new Date(this.dtend).getTime();
      const duration = (end - start) / (1000 * 60 * 60); // Convertire millisecondi in ore
      return duration;
    }
    return 0;
  }
}*/