import { Component, OnInit } from '@angular/core';
import { TimesheetService } from '../../core/services/timesheet.service';
import { TimeSheetDTO } from '../../core/models/timesheet.model';
import { finalize } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  // Carica i timesheet dal servizio
  private loadTimesheets(): void {
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
      hoursPerDay: {} // Inizializza hoursPerDay come un oggetto vuoto
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
