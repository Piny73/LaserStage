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