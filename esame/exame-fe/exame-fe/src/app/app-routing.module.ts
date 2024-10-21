import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityListComponent } from './features/activity-list/activity-list.component';
import { HomeComponent } from './features/home/home.component';
import { RegistrazioneComponent } from './features/registrazione/registrazione.component';
import { TimesheetListComponent } from './features/timesheet-list/timesheet-list.component';
import { LoginComponent } from './features/login/login.component';
import { ActivityFormComponent } from './features/activity-list/activity-form/activity-form.component';  // Aggiungi import per ActivityFormComponent
import { TimesheetFormComponent } from './features/timesheet-list/timesheet-form/timesheet-form.component'; // Aggiungi import per TimesheetFormComponent

const routes: Routes = [
  { path: '', component: LoginComponent },  // Imposta LoginComponent come pagina iniziale
  { path: 'home', component: HomeComponent },
  { path: 'activity', component: ActivityListComponent },
  { path: 'timesheet', component: TimesheetListComponent },
  { path: 'registrazione', component: RegistrazioneComponent },
  { path: 'login', component: LoginComponent },  // Aggiungi questa rotta per gestire /login esplicitamente

  // Rotte per creare e modificare attività
  { path: 'activities/new', component: ActivityFormComponent },  // Rotta per creare una nuova attività
  { path: 'activities/edit/:id', component: ActivityFormComponent },  // Rotta per modificare un'attività esistente

  // Rotte per creare e modificare timesheet
  { path: 'timesheets/new', component: TimesheetFormComponent },  // Rotta per creare un nuovo timesheet
  { path: 'timesheets/edit/:id', component: TimesheetFormComponent },  // Rotta per modificare un timesheet esistente

  // Reindirizza tutte le rotte non trovate alla pagina iniziale
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
