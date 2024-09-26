import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

import { AppuntamentiComponent } from './features/appuntamenti/appuntamenti/appuntamenti.component';
import { CreaAppuntamentoComponent } from './features/appuntamenti/crea-appuntamento/crea-appuntamento.component';
import { ClientiComponent } from './features/clienti/clienti.component';
import { LoginComponent } from './features/login/login.component';
import { ReportsComponent } from './features/reports/reports.component';
import { StatisticheComponent } from './features/statistiche/statistiche.component';
import { VettureComponent } from './features/vetture/vetture.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'appuntamenti', component: AppuntamentiComponent },
  { path: 'clienti', component: ClientiComponent },
  { path: 'vetture', component: VettureComponent },
  { path: 'nuovo-appuntamento', component: CreaAppuntamentoComponent },
  { path: 'statistiche', component: StatisticheComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect alla home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}




