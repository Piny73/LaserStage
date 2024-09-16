import { Injectable } from '@angular/core';
import { Area } from '../models/area.model';
import { map, Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { HttpHeaders } from '@angular/common/http';
import { UserCompanyService } from './user-company.service';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private readonly endpoint = 'company';
  private areaList: Area[] = [];

  constructor(
    private apiService: ApiService, 
    private userCompanyService: UserCompanyService,
    //private employeeService: EmployeeService
  ) {}

  create(_area: Area): Observable<Area> {
    _area.companyid = this.userCompanyService.getMainCompany().id;
    const _endpoint = `${this.endpoint}/area`;
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json'
    });

    return this.apiService.post(_endpoint, _area, headers).pipe(
      map(response => response)
    ); 
  }

  update(_area: Area): Observable<Area> {
    const _endpoint = `${this.endpoint}/area`;
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json'
    });

    return this.apiService.put(_endpoint, _area, headers).pipe(
      map(response => response)
    ); 
  }

  fill(): Observable<Area[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const _endpoint = `${this.endpoint}/listarea`;

    return this.apiService.post(_endpoint, this.userCompanyService.getMainCompany(), headers).pipe(
      map((response: any[]) => {
        if (Array.isArray(response)) {
          this.areaList = response.map((data: any) => {
            const area = new Area({
              id: data.id,
              companyid: data.companyid,
              description: data.description,
              responsibleid: data.responsibleid,
              parentid: data.parentid
            });
            return area;
          });

          this.setParent();
          return this.areaList;
        } else {
          console.error('Resposta da API não é um array');
          return [];
        }
      })
    );
  }

  getAreaList(): Area[] {
    return this.areaList;
  }

  findById(id: number): Area | undefined {
    return this.areaList.find(area => area.id == id);
  }

  setParent() {
    this.areaList.forEach(area => {
      if (area.parentid) {
        area.parent = this.areaList.find(a => a.id === area.parentid) as Area;
      }
    });
  }

  setAreaManager(employeeList: Employee[] ){
    this.areaList.forEach((a : Area) => {
      if(a.responsibleid){
        a.responsible = {...employeeList.find(employee => employee.id == a.responsibleid)} as Employee;
      }
    });
  }

}
