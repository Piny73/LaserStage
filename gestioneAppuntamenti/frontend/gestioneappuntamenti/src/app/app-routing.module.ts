import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppuntamentiListComponent } from './features/appuntamenti/appuntamenti-list/appuntamenti-list.component';

import { CreaAppuntamentoComponent } from './features/appuntamenti/crea-appuntamento/crea-appuntamento.component';
import { ClientiComponent } from './features/clienti/clienti/clienti.component';


import { ModificaClienteComponent } from './features/clienti/modifica-cliente/modifica-cliente.component';
import { RicercaClientiComponent } from './features/clienti/ricerca-clienti/ricerca-clienti.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { ReportsComponent } from './features/reports/reports.component';
import { StatisticheComponent } from './features/statistiche/statistiche.component';
import { VetturaComponent } from './features/vetture/vetture.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },

  { path: 'appuntamenti', component: AppuntamentiListComponent },

  { path: 'nuovo-appuntamento', component: CreaAppuntamentoComponent },

  { path: 'clienti', component: ClientiComponent },
  { path: 'clienti/modifica/:id', component: ModificaClienteComponent },

  { path: 'ricerca-clienti', component: RicercaClientiComponent },

  { path: 'statistiche', component: StatisticheComponent },

  { path: 'reports', component: ReportsComponent },

  { path: 'vetture', component: VetturaComponent },

  { path: 'login', component: LoginComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




