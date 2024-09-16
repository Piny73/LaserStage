import { BusinessPlan } from "./business-plan.model";
import { Employee } from "./employee.model";


export class EmployeeCostCalculated{
    id! : number;
    version! : number;
    bp! : BusinessPlan;
    employee! : Employee;
    startYear! : string;
    yearPlanned! : string;
    yearWorked! : string;
    responsible! : string;
    january! : number;
    february!: number;
    march!: number;
    april!: number;
    may!: number;
    june!: number;
    july!: number;
    august!: number;
    september!: number;
    october!: number;
    november!: number;
    december!: number;
    totalPrice!: number;
    totalQuantity!: number;
    totalCost!: number;
    totalTax!: number;
    totalMargin!: number;

    constructor(){}
}