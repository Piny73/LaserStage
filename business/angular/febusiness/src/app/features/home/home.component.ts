import { Component, OnInit } from '@angular/core';
import { forkJoin, switchMap } from 'rxjs';
import { CompanyService } from '../../core/services/company.service';
import { UserCompanyService } from '../../core/services/user-company.service';
import { AreaService } from '../../core/services/area.service';
import { EmployeeService } from '../../core/services/employee.service';
import { Company } from '../../core/models/company.model'; // Ajuste conforme o caminho correto
import { UserCompany } from '../../core/models/user-company.model';
import { Employee } from '../../core/models/employee.model';
import { Area } from '../../core/models/area.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  isLoading: boolean = true;
  userCompanyData: { data: UserCompany[] } = { data: [] }; 
  companyData: { data: Company[] } = { data: [] };
  areaData: { data: Area[] } = { data: [] };
  employeeData: { data: Employee[] } = { data: [] }; 

  constructor(
    public companyService: CompanyService,
    private userCompanyService: UserCompanyService,
    private areaService: AreaService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.isLoading = true;
  
    this.userCompanyService.fill()
      .pipe(
        switchMap(userCompanies => {
          this.userCompanyData.data = userCompanies;
          return this.companyService.fill();
        }),
        switchMap(companies => {
          this.companyData.data = companies;
          this.companyService.setMainCompany()
          return this.areaService.fill();
        }),
        switchMap(areas => {
          this.areaData.data = areas;
          return this.employeeService.fill();
        })
      )
      .subscribe({
        next: (employees) => {
          this.employeeData.data = employees;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erro ao carregar dados iniciais:', err);
          this.isLoading = false;
        }
      });
  }
  
}
