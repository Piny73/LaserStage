import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';

// Componenti specifici del modulo
import { ActivityFormComponent } from './activity-list/activity-form/activity-form.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityRowComponent } from './activity-list/activity-row/activity-row.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { TimesheetFormComponent } from './timesheet-list/timesheet-form/timesheet-form.component';
import { TimesheetListComponent } from './timesheet-list/timesheet-list.component';
import { TimesheetRowComponent } from './timesheet-list/timesheet-row/timesheet-row.component';

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
    NgbModalModule,
    NgbModule
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


