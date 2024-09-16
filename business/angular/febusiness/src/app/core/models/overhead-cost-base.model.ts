import { BusinessPlan } from "./business-plan.model";

export class OverHeadCostBase{
    id! : number;
    version! : number;
    businessplan!: BusinessPlan;
    description! : string;
    cost! : number;
    adjustment!: number;
    adjustimentPeriod! : string;
    startCost! : string;
    endCost! : string;
    responsible! : string;
    calculeted! : boolean;
    fixed!: boolean;
    
    constructor(){}
}