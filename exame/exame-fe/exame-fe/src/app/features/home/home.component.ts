import { Component } from '@angular/core';
import { Activity } from '../../core/models/activity.model';
import { TimeSheet } from '../../core/models/timesheet.model';
import { ActivityService } from '../../core/services/activity.service';
import { TimesheetService } from '../../core/services/timesheet.service';
import { switchMap } from 'rxjs';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isLoading: boolean = true;
  activityData: { data: Activity[] } = { data: [] }; 
  timeSheetData: { data: TimeSheet[] } = { data: [] };
  userData: { data: User[] } = { data: [] };

  constructor(
    public activityService: ActivityService,
    private timeSheetService: TimesheetService,
    private userService : UserService
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.activityService.fill()
      .pipe(
        switchMap(activities => {
          this.activityData.data = activities;
          return this.timeSheetService.fill();;
        }),
        switchMap((timesheet) => {
          this.timeSheetData.data = timesheet;
          return this.userService.fill();
        })
      )
      .subscribe({
        next: (user) => {
          this.userData.data = user;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error Load Data', err);
          this.isLoading = false;
        }
      });
  }
}
