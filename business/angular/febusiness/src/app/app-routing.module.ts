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
import { Emp2Component } from './features/emp2/emp2.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [RoteGuardService] },
  { path: 'company', component: CompanyComponent, canActivate: [RoteGuardService]},
  { path: 'businessplan', component: BusinessPlanComponent, canActivate: [RoteGuardService]},
  { path: 'area', component: AreaComponent, canActivate: [RoteGuardService]},
  { path: 'employee', component: Emp2Component, canActivate: [RoteGuardService]},
  // ...
  { path: '**', redirectTo: '', pathMatch: 'full' }
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
