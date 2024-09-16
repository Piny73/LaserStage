import { Employee } from './employee.model';

export class Area {
  id!: number;
  companyid!: number;
  responsibleid!: number;
  responsible!: Employee; 
  description!: string;
  parentid!: number;
  parent!: Area;

  constructor(init?: Partial<Area>) {
    Object.assign(this, init);
  }
}
