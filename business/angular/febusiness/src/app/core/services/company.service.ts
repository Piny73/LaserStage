import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Company } from '../models/company.model';
import { UserService } from './user.service';
import { UserCompanyService } from './user-company.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly endpoint = 'company';
  companyList: Company[] = [];
  selectedCompany!: Company;

  constructor(
    private apiService: ApiService, 
    private userService: UserService, 
    private userCompanyService: UserCompanyService) {}

  update(company: Company) : Observable<any>  {

    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json'
    });

    //console.log("Company Update: ", company);

    return this.apiService.put(this.endpoint, company, headers).pipe(
      map(response => {
        if (response) {
          console.log("Update OK");
        }
        return response;
      })
    ); 
  }

  
  create(company: Company) {
    return true;  
  }
    
  getCompanyList()  {
    return this.companyList;
  }

  fill(): Observable<Company[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let _endpoint = `${this.endpoint}/listcompanyusers`;
    let _user = this.userService.getUser();

    return this.apiService.post(_endpoint, _user, headers).pipe(
      map((response: any[]) => {
        if (Array.isArray(response)) {
          this.companyList = response.map((data: any) => ({
            id: data.id,
            version: data.version,
            name: data.name,
            socialName: data.socialName,
            responsible: data.responsible,
            address: data.address,
            city: data.city,
            country: data.country,
            phone: data.phone,
            email: data.email,
            foundedin: data.foundedin,
            legaltype: data.legaltype,
            legalnumber: data.legalnumber,
            businessplan: data.businessplan
          }));
        } else {
          console.error('Resposta da API não é um array');
        }
        return this.companyList;
      })
    );
  }

  setMainCompany() {
    let _usercompanyM = this.userCompanyService.companyList.find(u => u.mainCompany);
    if (_usercompanyM) {
      this.selectedCompany = this.companyList.find(c => c.id === _usercompanyM?.companyid) || this.companyList[0];
      this.userCompanyService.setMainCompany(this.selectedCompany, false);
    }
  }

  changeMainCompany(company:Company){

    this.selectedCompany = Object.assign({}, company);
    this.userCompanyService.setMainCompany(this.selectedCompany, true);

  }

  findById(id: number): Company | undefined {
    return this.companyList.find(company => company.id === id);
  }
}
