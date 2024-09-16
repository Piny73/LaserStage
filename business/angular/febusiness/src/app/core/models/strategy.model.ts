import { Company } from "./company.model";

export class Strategy{
    id!: number;
    version!: number;
    company!: Company;
    mission!: string;
    vision!: string;
    worth!: string;
    startCiclo!: string;
    endCiclo!: string;
    responsible!: string;
    valid!: boolean;
  }