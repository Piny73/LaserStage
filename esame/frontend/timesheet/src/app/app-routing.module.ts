import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityListComponent } from './features/activity-list/activity-list.component';
import { HomeComponent } from './features/home/home.component';
import { RegistrazioneComponent } from './features/registrazione/registrazione.component';
import { TimesheetListComponent } from './features/timesheet-list/timesheet-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent},
  { path: 'activity', component: ActivityListComponent},
  { path: 'timesheet', component: TimesheetListComponent},
  { path: 'registrazione', component: RegistrazioneComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
