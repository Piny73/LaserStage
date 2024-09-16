export class Company {
    id : number;
    version! : number;
    name!: string;
    socialName!: string;
    responsible!: string;
    address!: string;
    city!: string;
    country!: string;
    phone!: string;
    email!: string;
    foundedin!: string;
    legaltype!: string;
    legalnumber!: string;
    businessplan!: boolean;

    constructor(){
        this.id = 0;
    }
}
