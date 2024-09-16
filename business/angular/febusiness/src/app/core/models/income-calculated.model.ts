import { BusinessPlan } from "./business-plan.model";
import { Product } from "./product.model";

export class IncomeCalculated{
    id! : number;
    version! : number;
    bp! : BusinessPlan;
    product! : Product;
    startYear! : String;
    yearPlanned! : String;
    yearWorked! : String;
    responsible! : String;
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