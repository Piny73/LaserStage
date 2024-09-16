import { Company } from "./company.model";

export class Product{
    id!: number;
    version!: number;
    company!: Company;
    description!: string;
    costWithService!: number;
    costWithWork!: number;
    costWithOperation!: number;
    costWithLicences!: number;
    costTotal!: number;
    markUp!: number;
    taxFee!: number;
    finalPrice!: number;
    finalCost!: number;
    costTaxFee!: number;
    contributionMargin!: number;
    isService!: boolean;
    isPart!: boolean
    productParent!: Product;
}