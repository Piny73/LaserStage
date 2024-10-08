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