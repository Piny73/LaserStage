import { Component, OnInit } from '@angular/core';
import { Company } from '../../core/models/company.model';
import { CompanyService } from '../../core/services/company.service';
import { UserCompany } from '../../core/models/user-company.model';
import { UserCompanyService } from '../../core/services/user-company.service';
import { Area } from '../../core/models/area.model';
import { Employee } from '../../core/models/employee.model';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { AreaService } from '../../core/services/area.service';
import { EmployeeService } from '../../core/services/employee.service';

interface CompanyData {
  loading: boolean;
  companyList: Company[] | null;
  error: string | null;
}

interface UserData {
  loading: boolean;
  userList: UserCompany[] | null;
  error: string | null;
}

interface AreaData {
  loading: boolean;
  areaList: Area[] | null;
  error: string | null;
}

interface EmployeeData {
  loading: boolean;
  employeeList: Employee[] | null;
  error: string | null;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  companyData$!: Observable<CompanyData>;
  userData$!: Observable<UserData>;
  areaData$!: Observable<AreaData>;
  employeeData$!: Observable<EmployeeData>;

  constructor(
    private companyService: CompanyService, 
    private userCompanyService: UserCompanyService,
    private areaService: AreaService,
    private employeeService: EmployeeService) {
  }

  ngOnInit() {
    try {
      this.loadUser();
      this.loadCompany();
      this.loadArea();
      this.loadEmployee();
    } catch (error) {
      console.error('Erro ao inicializar o componente:', error);
    }
  }

  loadCompany(): void {
    console.log("Load Company...");
    this.companyData$ = this.companyService.fill().pipe(
      map((data: Company[]) => ({
        loading: false,
        companyList: data,
        error: null
      })),
      catchError(error => {
        console.error('Erro ao carregar Company:', error);
        return of({
          loading: false,
          companyList: null,
          error: 'Erro ao carregar Company.'
        });
      }),
      startWith({ loading: true, companyList: null, error: null })
    );
    this.companyService.setMainCompany();
  }

  loadUser(): void {
    console.log("Load User...");
    this.userData$ = this.userCompanyService.fill().pipe(
      map((data: UserCompany[]) => ({
        loading: false,
        userList: data,
        error: null
      })),
      catchError(error => {
        console.error('Erro ao carregar Users Company:', error);
        return of({
          loading: false,
          userList: null,
          error: 'Erro ao carregar Users.'
        });
      }),
      startWith({ loading: true, userList: null, error: null })
    );
  }

  loadArea(): void {
    console.log("Load Area...");
    this.areaData$ = this.areaService.fill().pipe(
      map((data: Area[]) => ({
        loading: false,
        areaList: data,
        error: null
      })),
      catchError(error => {
        console.error('Erro ao carregar Areas:', error);
        return of({
          loading: false,
          areaList: null,
          error: 'Erro ao carregar Areas.'
        });
      }),
      startWith({ loading: true, areaList: null, error: null })
    );
  }

  loadEmployee(): void {
    console.log("Load Employee...");
    this.employeeData$ = this.employeeService.fill().pipe(
      map((data: Employee[]) => ({
        loading: false,
        employeeList: data,
        error: null
      })),
      catchError(error => {
        console.error('Erro ao carregar Employee:', error);
        return of({
          loading: false,
          employeeList: null,
          error: 'Erro ao carregar Employee.'
        });
      }),
      startWith({ loading: true, employeeList: null, error: null })
    );
  }

}