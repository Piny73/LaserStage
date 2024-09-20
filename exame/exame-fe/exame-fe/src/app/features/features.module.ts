import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ActivityComponent } from './activity/activity.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { ActivityListComponent } from './activity/activity-list/activity-list.component';
import { ActivityRowComponent } from './activity/activity-row/activity-row.component';
import { TimesheetListComponent } from './timesheet/timesheet-list/timesheet-list.component';
import { TimesheetRowComponent } from './timesheet/timesheet-row/timesheet-row.component';



@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    ActivityComponent,
    TimesheetComponent,
    ActivityListComponent,
    ActivityRowComponent,
    TimesheetListComponent,
    TimesheetRowComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FeaturesModule { }
