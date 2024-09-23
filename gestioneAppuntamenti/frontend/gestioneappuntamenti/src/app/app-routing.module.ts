import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestioneUtenteComponent } from './features/gestione-utente/gestione-utente.component';
import { HomeComponent } from './features/home/home.component'; // Importa la HomeComponent
import { CreaAppuntamentoComponent } from './pages/crea-appuntamento/crea-appuntamento.component';
import { GestioneAppuntamentiComponent } from './pages/gestione-appuntamenti/gestione-appuntamenti.component';
import { StatisticheComponent } from './pages/statistiche/statistiche.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, // Usa HomeComponent come dashboard
  { path: 'crea-appuntamento', component: CreaAppuntamentoComponent },
  { path: 'gestione-appuntamenti', component: GestioneAppuntamentiComponent },
  { path: 'statistiche', component: StatisticheComponent },
  { path: 'gestione-utente', component: GestioneUtenteComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Reindirizza alla HomeComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


