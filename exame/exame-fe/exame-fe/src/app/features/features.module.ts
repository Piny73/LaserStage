import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Componenti specifici del modulo
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityRowComponent } from './activity-list/activity-row/activity-row.component';
import { TimesheetListComponent } from './timesheet-list/timesheet-list.component';
import { TimesheetRowComponent } from './timesheet-list/timesheet-row/timesheet-row.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { ActivityFormComponent } from './activity-list/activity-form/activity-form.component';
import { TimesheetFormComponent } from './timesheet-list/timesheet-form/timesheet-form.component';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    ActivityListComponent,
    ActivityRowComponent,
    ActivityFormComponent,
    TimesheetListComponent,
    TimesheetRowComponent,
    TimesheetFormComponent,
    RegistrazioneComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule // Aggiungi NgbModule se utilizzi componenti di ng-bootstrap
  ],
  exports: [
    LoginComponent,
    HomeComponent,
    ActivityListComponent,
    ActivityRowComponent,
    ActivityFormComponent,
    TimesheetListComponent,
    TimesheetRowComponent,
    TimesheetFormComponent,
    RegistrazioneComponent
  ]
})
export class FeaturesModule { }

