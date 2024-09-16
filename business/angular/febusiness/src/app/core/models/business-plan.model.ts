export class BusinessPlan{
    id: number;
    companyid!: number;
    startYear!: string;
    yearsPlanning!: number;
    responsible!: string;
    wacc!: number;
    tir!: number;
    conclusion!: boolean;
    inWork!: boolean;

    constructor(){
        this.id = 0;
    }
}