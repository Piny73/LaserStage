import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '../shared/shared.module';
import { AppuntamentiFormComponent } from './appuntamenti/appuntamenti-form/appuntamenti-form.component';
import { AppuntamentiComponent } from './appuntamenti/appuntamenti/appuntamenti.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreaAppuntamentoComponent } from './appuntamenti/crea-appuntamento/crea-appuntamento.component';
import { StatisticheComponent } from './statistiche/statistiche.component';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [
    AppuntamentiComponent,
    AppuntamentiFormComponent,
    HomeComponent,
    LoginComponent,
    CreaAppuntamentoComponent,
    StatisticheComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule
  ],
  exports: [
    HomeComponent,
    LoginComponent
  ]
})
export class FeaturesModule { }














