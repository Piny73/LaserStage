import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { AppuntamentiFormComponent } from './appuntamenti/appuntamenti-form/appuntamenti-form.component';
import { AppuntamentiComponent } from './appuntamenti/appuntamenti/appuntamenti.component';
import { CreaAppuntamentoComponent } from './appuntamenti/crea-appuntamento/crea-appuntamento.component';
import { ClientiComponent } from './clienti/clienti/clienti.component';

import { AppuntamentiListComponent } from './appuntamenti/appuntamenti-list/appuntamenti-list.component';
import { ModificaClienteComponent } from './clienti/modifica-cliente/modifica-cliente.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReportsComponent } from './reports/reports.component';
import { StatisticheComponent } from './statistiche/statistiche.component';
import { VetturaComponent } from './vetture/vetture.component';

@NgModule({
  declarations: [
    AppuntamentiComponent,
    AppuntamentiFormComponent,
    AppuntamentiListComponent,
    CreaAppuntamentoComponent,
    ClientiComponent,
    ModificaClienteComponent,

    StatisticheComponent,
    
    ReportsComponent,
    VetturaComponent,
    
    HomeComponent,
    LoginComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule,
    SharedModule,
    
  ],
  exports: [
    HomeComponent,
    LoginComponent
  ]
})
export class FeaturesModule { }















