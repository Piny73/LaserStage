import { Injectable } from '@angular/core';
import { BusinessPlan } from '../models/business-plan.model';
import { ApiService } from '../api.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserCompanyService } from './user-company.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessPlanService {

  private readonly endpoint = 'businessplan';
  private businessPlanList: BusinessPlan[] = [];
  private selectedBusinessPlan: BusinessPlan = new BusinessPlan();

  constructor(
    private apiService: ApiService,
    private userCompanyService: UserCompanyService
  ) {}

  getBPList(): BusinessPlan[] {
    return this.businessPlanList;
  }

  getSelectedBusinessPlan(): BusinessPlan {
    return this.selectedBusinessPlan;
  }

  fill(): Observable<BusinessPlan[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const _endpoint = `${this.endpoint}/bpcompany`;

    return this.apiService.post(_endpoint, this.userCompanyService.getMainCompany(), headers).pipe(
      map((response: any[]) => {
        if (Array.isArray(response)) {
          this.businessPlanList = response.map((data: any) => {
            return {
              id: data.id,
              companyid: data.companyid,
              startYear: data.startYear,
              yearsPlanning: data.yearsPlanning,
              responsible: data.responsible,
              wacc: data.wacc,
              tir: data.tir,
              conclusion: data.conclusion,
              inWork: data.inWork
            } as BusinessPlan;
          });
          this.setMainBP();
        } else {
          console.error('Resposta da API não é um array');
        }
        return this.businessPlanList;
      })
    );
  }

  setMainBP(): void {
    if (this.businessPlanList.length > 0) {
      this.selectedBusinessPlan= this.businessPlanList
        .filter(bp => bp.inWork === true)
        .reduce((max, bp) => (bp.id > max.id ? bp : max), this.businessPlanList[0]);
    } else {
      this.selectedBusinessPlan = new BusinessPlan();
    }
  }

  changeMainBP(bp: BusinessPlan): void {
    this.selectedBusinessPlan = { ...bp };
  }

  update(_bp: BusinessPlan) : Observable<BusinessPlan>  {
    const idx = this.businessPlanList.findIndex((v) => v.id === _bp.id);
      const headers = new HttpHeaders({ 
        'Content-Type': 'application/json'
      });

      return this.apiService.put(this.endpoint, _bp, headers).pipe(
        map(response => {
          if (response) {
            console.log("Update Ok");
          }
          return response;
        })
      ); 
  }


  create(_bp: BusinessPlan): Observable<BusinessPlan>  {
   
    const headers = new HttpHeaders({ 
        'Content-Type': 'application/json'
      });

      return this.apiService.post(this.endpoint, _bp, headers).pipe(
        map(response => {
          if (response) {
            console.log("Create Ok");
          }
          return response;
        })
      ); 
  }

  findBPById(_id: number): BusinessPlan | undefined {
    return this.businessPlanList.find(__bp => __bp.id === _id);
  }
}
