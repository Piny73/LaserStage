// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { CompanyComponent } from './features/company/company/company.component';
import { RoteGuardService } from './core/rote-guard.service';
import { BusinessPlanComponent } from './features/business-plan/business-plan/business-plan.component';
import { AreaComponent } from './features/area/area/area.component';
import { EmployeeComponent } from './features/employee/employee/employee.component';
import { E2ListComponent } from './features/e2/e2-list/e2-list.component';
import { EmployeeListComponent } from './features/employee/employee-list/employee-list.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [RoteGuardService] },
  { path: 'company', component: CompanyComponent, canActivate: [RoteGuardService]},
  { path: 'businessplan', component: BusinessPlanComponent, canActivate: [RoteGuardService]},
  { path: 'area', component: AreaComponent, canActivate: [RoteGuardService]},
  { path: 'employee', component: E2ListComponent, canActivate: [RoteGuardService]},
  // ...
  { path: '**', redirectTo: '', pathMatch: 'full' }
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
