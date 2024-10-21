import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TimesheetService } from '../../../core/services/timesheet.service';
import { UtilsService } from '../../../core/utils.service';
import { TimeSheetDTO } from '../../../core/models/timesheet.model';
import { User } from '../../../core/models/user.model';
import { Activity } from '../../../core/models/activity.model';
import { UserService } from '../../../core/services/user.service';
import { ActivityService } from '../../../core/services/activity.service';

@Component({
  selector: 'app-timesheet-form',
  templateUrl: './timesheet-form.component.html',
  styleUrls: ['./timesheet-form.component.css']
})
export class TimesheetFormComponent implements OnInit {
  timesheetForm!: FormGroup;
  private timesheetCopy!: TimeSheetDTO;
  userList: User[] = [];
  activityList: Activity[] = [];
  showSaveDialog = false; // Variabile per il dialogo di salvataggio
  showDeleteDialog = false; // Variabile per il dialogo di eliminazione

  @Input() timesheet!: TimeSheetDTO; // Riceve il timesheet da modificare o uno nuovo da creare
  @Output() reload = new EventEmitter<boolean>(); // Evento per ricaricare la lista

  constructor(
    private fb: FormBuilder,
    private timesheetService: TimesheetService,
    private utils: UtilsService,
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    this.initializeForm(); // Inizializza il form
    if (this.timesheet) {
      this.loadTimesheetData(); // Carica i dati del timesheet se esistente
    }
    this.loadUsers(); // Carica la lista degli utenti
    this.loadActivities(); // Carica la lista delle attività
  }

  // Inizializza il FormGroup
  private initializeForm(): void {
    this.timesheetForm = this.fb.group({
      id: [null],
      userId: [null, Validators.required], // Corretto per l'uso del camelCase
      activityId: [null, Validators.required], // Corretto per l'uso del camelCase
      dtstart: ['', Validators.required],
      dtend: [''],
      detail: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  // Carica i dati del timesheet se esistente
  private loadTimesheetData(): void {
    this.timesheetCopy = { ...this.timesheet };
    this.timesheetForm.patchValue({
      ...this.timesheet,
      dtstart: this.utils.formatDate(this.timesheet.dtstart, true),
      dtend: this.utils.formatDate(this.timesheet.dtend, true)
    });
  }

  // Carica la lista degli utenti
  private loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data: User[]) => this.userList = data,
      error: (error) => console.error('Errore durante il caricamento degli utenti:', error)
    });
  }

  // Carica la lista delle attività
  private loadActivities(): void {
    this.activityService.fill().subscribe({
      next: (data: Activity[]) => this.activityList = data,
      error: (error) => console.error('Errore durante il caricamento delle attività:', error)
    });
  }

  // Selezione attività
  onActivitySelected(event: Event): void {
    const activityId = parseInt((event.target as HTMLSelectElement).value, 10);
    const selectedActivity = this.activityList.find(activity => activity.id === activityId);
    if (selectedActivity) {
      this.timesheetForm.patchValue({
        activityId: activityId,
        dtstart: this.utils.formatDate(selectedActivity.dtstart, true),
        dtend: this.utils.formatDate(selectedActivity.dtend, true) || ''
      });
    }
  }

  // Selezione utente
  onUserSelected(event: Event): void {
    const userId = parseInt((event.target as HTMLSelectElement).value, 10);
    this.timesheetForm.patchValue({ userId: userId });
  }

  // Gestione dell'invio del form
  onSubmit(): void {
    if (this.timesheetForm.valid) {
      this.save(); // Chiama il metodo di salvataggio
    } else {
      this.timesheetForm.markAllAsTouched(); // Mostra gli errori di validazione
    }
  }

  // Salva i dati del timesheet
  private save(): void {
    const timesheetData: TimeSheetDTO = {
      ...this.timesheetForm.value,
      dtstart: this.utils.formatDateForBackend(new Date(this.timesheetForm.value.dtstart)),
      dtend: this.utils.formatDateForBackend(new Date(this.timesheetForm.value.dtend))
    };

    if (timesheetData.id) {
      this.timesheetService.updateTimesheet(timesheetData).subscribe({
        next: () => {
          console.log('Aggiornamento completato con successo');
          this.reload.emit(true);
          this.activeModal.close();
        },
        error: (error) => this.handleError(error, 'Errore durante l\'aggiornamento')
      });
    } else {
      this.timesheetService.save(timesheetData).subscribe({
        next: () => {
          console.log('Creazione completata con successo');
          this.reload.emit(true);
          this.activeModal.close();
        },
        error: (error) => this.handleError(error, 'Errore durante la creazione')
      });
    }
  }

  // Gestione degli errori
  private handleError(error: any, message: string): void {
    console.error(message, error);
    alert(message);
  }

  // Reset del form
  resetForm(): void {
    this.timesheetForm.reset();
  }

  // Gestione dei dialog di conferma
  confirmSave(): void {
    this.showSaveDialog = true; // Mostra il dialog di conferma salvataggio
  }

  cancelSave(): void {
    this.showSaveDialog = false; // Chiudi il dialog di conferma salvataggio
  }

  confirmDelete(): void {
    this.showDeleteDialog = true; // Mostra il dialog di conferma eliminazione
  }

  cancelDelete(): void {
    this.showDeleteDialog = false; // Chiudi il dialog di conferma eliminazione
  }

  openDeleteConfirmation(): void {
    this.showDeleteDialog = true; // Apri il dialogo di conferma eliminazione
  }
}
