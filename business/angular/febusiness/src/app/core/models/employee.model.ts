import { Area } from './area.model';
import { Company } from './company.model';
import { User } from './user.model';

export class Employee {
  id!: number;
  name!: string;
  employeeRole!: string;
  areaid!: number | null;
  area?: Area | null; 
  salary!: number;
  quantity!: number;
  startedAt!: string | null;
  endedAt!: string | null; 
  companyid!: number | null;
  company?: Company | null;
  userid!: number | null;
  user?: User | null;
  managerid!: number | null;
  manager?: Employee | null;

  constructor(init?: Partial<Employee>) {
    Object.assign(this, init);
  }
}
