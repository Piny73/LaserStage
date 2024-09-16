import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component'
import { LayoutModule } from "../layout/layout.module";
import { CompanyComponent } from './company/company/company.component';
import { BusinessPlanComponent } from './business-plan/business-plan/business-plan.component';
import { StrategyComponent } from './strategy/strategy/strategy.component';
import { ProductComponent } from './product/product/product.component';
import { AreaComponent } from './area/area/area.component';
import { EmployeeComponent } from './employee/employee/employee.component';
import { OverheadCostBaseComponent } from './business-plan/budget/overhead-cost/base/overhead-cost-base/overhead-cost-base.component';
import { OverheadCostListComponent } from './business-plan/budget/overhead-cost/base/overhead-cost-list/overhead-cost-list.component';
import { AreaListComponent } from './area/area-list/area-list.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { StrategyListComponent } from './strategy/strategy-list/strategy-list.component';
import { BusinessPlanListComponent } from './business-plan/business-plan-list/business-plan-list.component';
import { OverheadCostCalculatedComponent } from './business-plan/budget/overhead-cost/calculated/overhead-cost-calculated/overhead-cost-calculated.component';
import { OverheadCostCalculatedListComponent } from './business-plan/budget/overhead-cost/calculated/overhead-cost-calculated-list/overhead-cost-calculated-list.component';
import { IncomesCalculatedComponent } from './business-plan/budget/incomes/incomes-calculated/incomes-calculated.component';
import { IncomesCalculatedListComponent } from './business-plan/budget/incomes/incomes-calculated-list/incomes-calculated-list.component';
import { EmployeeCostCalculatedComponent } from './business-plan/budget/employee/employee-cost-calculated/employee-cost-calculated.component';
import { EmployeeCostCalculatedListComponent } from './business-plan/budget/employee/employee-cost-calculated-list/employee-cost-calculated-list.component';
import { CompanyListRowComponent } from './company/company-list/company-list-row/company-list-row.component';
import { BusinessPlanListRowComponent } from './business-plan/business-plan-list/business-plan-list-row/business-plan-list-row.component';
import { AreaListRowComponent } from './area/area-list/area-list-row/area-list-row.component';
import { EmployeeListRowComponent } from './employee/employee-list/employee-list-row/employee-list-row.component';
import { SharedModule } from '../shared/shared.module';
import { E2ListComponent } from './e2/e2-list/e2-list.component';
import { E2DetailComponent } from './e2/e2-detail/e2-detail.component';


@NgModule({
  declarations: [
    LoginComponent, 
    HomeComponent, 
    CompanyComponent, 
    BusinessPlanComponent, 
    StrategyComponent, 
    ProductComponent, 
    AreaComponent, 
    EmployeeComponent, 
    OverheadCostBaseComponent, 
    OverheadCostListComponent, 
    AreaListComponent, 
    CompanyListComponent, 
    EmployeeListComponent, 
    ProductListComponent, 
    StrategyListComponent, 
    BusinessPlanListComponent, 
    OverheadCostCalculatedComponent, 
    OverheadCostCalculatedListComponent, 
    IncomesCalculatedComponent, 
    IncomesCalculatedListComponent, 
    EmployeeCostCalculatedComponent, 
    EmployeeCostCalculatedListComponent, 
    CompanyListRowComponent, 
    BusinessPlanListRowComponent, 
    AreaListRowComponent, 
    EmployeeListRowComponent, E2ListComponent, E2DetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    LayoutModule,
    SharedModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  exports: [LoginComponent]
  })

  export class FeaturesModule { }
