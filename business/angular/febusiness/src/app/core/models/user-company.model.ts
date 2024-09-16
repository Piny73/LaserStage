export class UserCompany{
    userid!:number;
    companyid: number;
    mainCompany! : boolean;
    responsable!: boolean;
    email!: string;
    firstname!: string;
    lastname!: string;
    role!: string;

    constructor(){
        this.companyid = 0;
    }
}