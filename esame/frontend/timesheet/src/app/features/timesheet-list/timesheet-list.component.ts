import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa il router per la navigazione
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

  constructor(
    private timesheetService: TimesheetService,
    private router: Router  // Inietta il Router per la navigazione
  ) {}

  ngOnInit(): void {
    this.loadTimesheets();
  }

  // Carica i timesheet dal servizio
  loadTimesheets(): void {
    this.loading = true;
    this.errorMessage = '';
    this.timesheetService.getTimesheets().pipe(
      finalize(() => this.loading = false) // Disabilita l'indicatore di caricamento alla fine della richiesta
    ).subscribe(
      (data: TimeSheetDTO[]) => {
        this.timesheets = data;
      },
      (error: any) => {
        this.errorMessage = 'Errore durante il caricamento dei timesheet.';
        console.error(this.errorMessage, error);
      }
    );
  }

  // Aggiunge un nuovo timesheet, navigando alla pagina del modulo
  addNewTimesheet(): void {
    this.router.navigate(['/timesheets/new']);  // Naviga al modulo per aggiungere un nuovo timesheet
  }

  // Modifica un timesheet esistente
  editTimesheet(timesheet: TimeSheetDTO): void {
    this.router.navigate(['/timesheets/edit', timesheet.id]);  // Naviga al modulo per modificare il timesheet
  }

  // Conferma l'eliminazione di un timesheet
  confirmDelete(timesheet: TimeSheetDTO): void {
    this.timesheetToDelete = timesheet;
    this.showDeleteDialog = true;
  }

  // Elimina un timesheet confermato
  deleteTimesheet(): void {
    if (this.timesheetToDelete) {
      this.loading = true;
      this.errorMessage = '';
      this.timesheetService.deleteTimesheet(this.timesheetToDelete.id).pipe(
        finalize(() => this.loading = false)
      ).subscribe(
        () => {
          this.loadTimesheets();  // Ricarica i timesheet dopo l'eliminazione
          this.cancelDelete();    // Chiudi il dialogo di conferma
        },
        (error: any) => {
          this.errorMessage = 'Errore durante l\'eliminazione del timesheet.';
          console.error(this.errorMessage, error);
        }
      );
    }
  }

  // Annulla il dialogo di eliminazione
  cancelDelete(): void {
    this.timesheetToDelete = null;
    this.showDeleteDialog = false;
  }
}