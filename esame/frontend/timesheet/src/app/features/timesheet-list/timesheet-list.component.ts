import { Component } from '@angular/core';
import { TimeSheet } from '../../core/models/timesheet.model';
import { TimesheetService } from '../../core/services/timesheet.service';

@Component({
  selector: 'app-timesheet-list',
  templateUrl: './timesheet-list.component.html',
  styleUrls: ['./timesheet-list.component.css']
})
export class TimesheetListComponent {
  timesheets: TimeSheet[] = [];
  selectedTimesheet: TimeSheet | null = null;
  loading: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private timesheetService: TimesheetService) {}

  ngOnInit(): void {
    this.loadTimesheets();
  }

  loadTimesheets(): void {
    this.loading = true;
    this.timesheetService.getAllTimesheets().subscribe({
      next: (data: TimeSheet[]) => {
        this.timesheets = data;
        this.loading = false;
      },
      error: err => {
        this.errorMessage = 'Errore nel caricamento dei timesheets';
        console.error(err);
        this.loading = false;
      }
    });
  }

  onEditTimesheet(id: number): void {
    this.selectedTimesheet = this.timesheets.find(ts => ts.id === id) || null;
  }

  onSaveTimesheet(timesheet: TimeSheet): void {
    if (this.selectedTimesheet) {
      this.timesheetService.updateTimesheet(this.selectedTimesheet.id, timesheet).subscribe({
        next: () => {
          this.loadTimesheets();
          this.successMessage = 'Timesheet aggiornato con successo!';
        },
        error: err => {
          this.errorMessage = 'Errore nell\'aggiornamento del timesheet';
          console.error(err);
        }
      });
    } else {
      this.timesheetService.createTimesheet(timesheet).subscribe({
        next: () => {
          this.loadTimesheets();
          this.successMessage = 'Nuovo timesheet creato con successo!';
        },
        error: err => {
          this.errorMessage = 'Errore nella creazione del timesheet';
          console.error(err);
        }
      });
    }
    this.selectedTimesheet = null; // Reset del form
  }

  onDeleteTimesheet(id: number): void {
    this.timesheetService.deleteTimesheet(id).subscribe({
      next: () => {
        this.loadTimesheets();
        this.successMessage = 'Timesheet eliminato con successo!';
      },
      error: err => {
        this.errorMessage = 'Errore nell\'eliminazione del timesheet';
        console.error(err);
      }
    });
  }

  onNewTimesheet(): void {
    this.selectedTimesheet = null; // Resetta il timesheet selezionato per creare un nuovo timesheet
  }
}
