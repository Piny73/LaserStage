import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { TimeSheetDTO } from '../../core/models/timesheet.model';
import { TimesheetService } from '../../core/services/timesheet.service';
import { TimesheetFormComponent } from './timesheet-form/timesheet-form.component';

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
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadTimesheets();
  }

  loadTimesheets(userId: number = 1, page: number = 0, size: number = 10): void { // Aggiunti i parametri
    this.loading = true;
    this.errorMessage = '';
    
    this.timesheetService.getTimeSheets(userId, page, size).subscribe( // Passati i parametri
      (data: TimeSheetDTO[]) => {
        console.log('Timesheets caricati:', data); // Log per il debug
        this.timesheets = data;
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'Errore durante il caricamento dei timesheet.';
        console.error(this.errorMessage, error);
      },
      () => {
        this.loading = false; // Assicurati di impostare loading a false quando il caricamento è completato
      }
    );
  }

  // Apre il modal per aggiungere o modificare un timesheet
  openTimesheetModal(timesheet?: TimeSheetDTO): void {
    const modalRef = this.modalService.open(TimesheetFormComponent, { size: 'lg' });
    modalRef.componentInstance.timesheet = timesheet ? { ...timesheet } : this.createEmptyTimeSheet();

    // Ricarica la lista dei timesheet quando il modal è chiuso
    modalRef.componentInstance.reload.subscribe((shouldReload: boolean) => {
      if (shouldReload) {
        this.loadTimesheets(); // Ricarica i timesheet dopo il salvataggio/modifica
      }
    });
  }

  // Crea un nuovo timesheet vuoto
  private createEmptyTimeSheet(): TimeSheetDTO {
    return {
      id: 0, // ID iniziale per un nuovo timesheet
      userId: null, // Non specificare un ID utente per un nuovo timesheet
      activityId: null, // Non specificare un ID attività per un nuovo timesheet
      dtstart: null, // Imposta null per le date di inizio e fine
      dtend: null,
      detail: '', // Dettagli vuoti per un nuovo timesheet
    };
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


