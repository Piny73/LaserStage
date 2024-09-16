import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api.service';
import { UserService } from './user.service';
import { UserCompany } from '../models/user-company.model';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class UserCompanyService {
  private readonly endpoint = 'company';
  companyList: UserCompany[] = [];
  private mainCompany!: Company;

  constructor(private userService: UserService, private apiService: ApiService) {}

  fill(): Observable<UserCompany[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let _endpoint = `${this.endpoint}/listuser`;
    let _user = this.userService.getUser();

    return this.apiService.post(_endpoint, _user, headers).pipe(
      map((response: any[]) => {
        if (Array.isArray(response)) {
          this.companyList = response.map(data => ({
            userid: data.userid,
            companyid: data.companyid,
            mainCompany: data.mainCompany,
            responsable: data.responsable,
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            role: data.role
          }));
        } else {
          console.error('Resposta da API não é um array');
        }
        return this.companyList;
      })
    );
  }

  setMainCompany(company: Company, _ischange: boolean) {
    this.mainCompany = company;
  }

  getMainCompany(): Company {
    return this.mainCompany;
  }
}
