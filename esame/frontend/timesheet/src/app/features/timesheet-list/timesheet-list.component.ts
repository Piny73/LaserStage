import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa il Router
import { finalize } from 'rxjs/operators';
import { TimeSheetDTO } from '../../core/models/timesheet.model';
import { TimesheetService } from '../../core/services/timesheet.service';

@Component({
  selector: 'app-timesheet-list',
  templateUrl: './timesheet-list.component.html',
  styleUrls: ['./timesheet-list.component.css']
})
export class TimesheetListComponent implements OnInit {
  timesheets: TimeSheetDTO[] = [];
  showDeleteDialog = false;
  timesheetToDelete: TimeSheetDTO | null = null;
  loading = false; // Indicatore di caricamento
  errorMessage = ''; // Messaggio di errore

  constructor(private timesheetService: TimesheetService, private router: Router) {} // Aggiungi Router nel costruttore

  ngOnInit(): void {
    this.loadTimesheets();
  }

  loadTimesheets(): void {
    this.loading = true;
    this.errorMessage = '';
    this.timesheetService.getTimesheets().pipe(
      finalize(() => this.loading = false) // Disabilita l'indicatore di caricamento alla fine della richiesta
    ).subscribe(
      (data: TimeSheetDTO[]) => {
        this.timesheets = data;
      },
      (error: any) => { // Tipizza il parametro 'error' come 'any' o usa un tipo più specifico
        this.errorMessage = 'Errore durante il caricamento dei timesheet.';
        console.error(this.errorMessage, error);
      }
    );
  }

  addNewTimesheet(): void {
    // Naviga al modulo per aggiungere un nuovo timesheet
    this.router.navigate(['/timesheet/add']); // Sostituisci con il percorso corretto per il modulo di aggiunta
  }

  editTimesheet(timesheet: TimeSheetDTO): void {
    // Naviga al modulo per modificare il timesheet
    this.router.navigate(['/timesheet/edit', timesheet.id]); // Sostituisci con il percorso corretto per il modulo di modifica
  }

  confirmDelete(timesheet: TimeSheetDTO): void {
    this.timesheetToDelete = timesheet;
    this.showDeleteDialog = true;
  }

  deleteTimesheet(): void {
    if (this.timesheetToDelete) {
      this.loading = true;
      this.errorMessage = '';
      this.timesheetService.deleteTimesheet(this.timesheetToDelete.id).pipe(
        finalize(() => this.loading = false)
      ).subscribe(
        () => {
          this.loadTimesheets();
          this.cancelDelete();
        },
        (error: any) => { // Tipizza il parametro 'error' come 'any' o usa un tipo più specifico
          this.errorMessage = 'Errore durante l\'eliminazione del timesheet.';
          console.error(this.errorMessage, error);
        }
      );
    }
  }

  cancelDelete(): void {
    this.timesheetToDelete = null;
    this.showDeleteDialog = false;
  }
}


