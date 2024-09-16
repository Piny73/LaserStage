import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { map, Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { HttpHeaders } from '@angular/common/http';
import { UserCompanyService } from './user-company.service';
import { AreaService } from './area.service';
import { Area } from '../models/area.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly endpoint = 'company';
  private employeeList: Employee[] = [];
  private selectedEmployee!: Employee;

  constructor(
    private apiService: ApiService, 
    private userCompanyService: UserCompanyService,
    private areaService: AreaService
  ) {}

  save(_employee: Employee): Observable<Employee> {
    _employee.company = this.userCompanyService.getMainCompany();
    const _endpoint = `${this.endpoint}/employee`;
  
    return this.apiService.post(_endpoint, _employee).pipe(
      map(response => response as Employee)
    );
  }
  

  update(_employee: Employee): Observable<Employee> {
    const _endpoint = `${this.endpoint}/employee`;
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json'
    });

    return this.apiService.put(_endpoint, _employee, headers).pipe(
      map(response => response)
    );
  }
  
  delete(_employee: Employee): Observable<void> {
    const _endpoint = `${this.endpoint}/employee/${_employee.id}`;
  
    return this.apiService.delete(_endpoint).pipe(
      map(() => {})
    );
  }
  

  fill(): Observable<Employee[]> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const _endpoint = `${this.endpoint}/listemployee`;

    return this.apiService.post(_endpoint, this.userCompanyService.getMainCompany(), headers).pipe(
      map((response: any[]) => {
        if (Array.isArray(response)) {
          this.employeeList = response.map((data: any) => {
            const employee = new Employee({
              id: data.id,
              companyid: data.companyid,
              name: data.name,
              employeeRole: data.employeeRole,
              areaid: data.areaid,
              salary: data.salary,
              startedAt: data.startedAt,
              endedAt: data.endedAt,
              managerid: data.managerid,
              quantity: data.quantity
            });

            if(employee.areaid){
              employee.area = this.areaService.getAreaList().find(area => area.id === employee.areaid) as Area;
            }
            
            return employee;
          });

          this.setManager();
          return this.employeeList;
        } else {
          console.error('Resposta da API não é um array');
          return [];
        }
      })
    );
  }

  getEmployeeList(): Employee[] {
    return this.employeeList;
  }

  findById(id: number): Employee | undefined {
    return this.employeeList.find(employee => employee.id === id);
  }

  setManager() {
    this.employeeList.forEach(employee => {
      if (employee.managerid) {
        employee.manager = this.employeeList.find(e => e.id === employee.managerid) as Employee;
      }
    });
  }

  setSelectedEmployee(employee: Employee | null) {
    console.log("EmployList length: ", this.employeeList.length);
    if (this.employeeList.length > 0) {
      if (employee) {
        this.selectedEmployee = { ...employee };
      } else {
        this.selectedEmployee = { ...this.employeeList[0] };
      }
    } else {
      this.selectedEmployee = new Employee();
    }
  }

  getSelectedEmployee(): Employee {
    return this.selectedEmployee;
  }


}
