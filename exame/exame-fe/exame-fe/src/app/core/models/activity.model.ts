import { User } from "./user.model";

export class Activity {
  id! : number
  description!: string;
  dtstart!: string | null;
  dtend!: string | null;
  ownerid! : number;
  enable! : boolean;
  owner!: User | null;;
  
  constructor(init?: Partial<Activity>) {
    Object.assign(this, init);
  }
  
}