import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityListComponent } from './features/activity-list/activity-list.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { RegistrazioneComponent } from './features/registrazione/registrazione.component';
import { TimesheetListComponent } from './features/timesheet-list/timesheet-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Imposta LoginComponent come pagina iniziale
  { path: 'home', component: HomeComponent },
  { path: 'activity', component: ActivityListComponent },
  { path: 'timesheet', component: TimesheetListComponent },
  { path: 'registrazione', component: RegistrazioneComponent },
  { path: 'login', component: LoginComponent }, // Aggiungi questa rotta per gestire /login esplicitamente
  { path: '**', redirectTo: '', pathMatch: 'full' } // Reindirizza tutte le rotte non trovate a ''
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

