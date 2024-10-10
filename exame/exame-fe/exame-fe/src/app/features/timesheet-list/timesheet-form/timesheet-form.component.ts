// timesheet-form.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TimesheetService } from '../../../core/services/timesheet.service';
import { UtilsService } from '../../../core/utils.service';
import { TimeSheetDTO } from '../../../core/models/timesheet.model';
import { User } from '../../../core/models/user.model';
import { Activity } from '../../../core/models/activity.model';

@Component({
  selector: 'app-timesheet-form',
  templateUrl: './timesheet-form.component.html',
  styleUrls: ['./timesheet-form.component.css']
})
export class TimesheetFormComponent implements OnInit {
  timesheetForm!: FormGroup;
  private timesheetCopy!: TimeSheetDTO;
  currentUser!: number | null;
  currentActivity!: number | null;
  showSaveDialog = false;
  showDeleteDialog = false;
  userList: User[] = [];
  activityList: Activity[] = [];

  @Input() timesheet!: TimeSheetDTO; // Riceve il timesheet da modificare o uno nuovo da creare
  @Output() reload = new EventEmitter<boolean>(); // Evento per ricaricare la lista

  constructor(
    private fb: FormBuilder,
    private timesheetService: TimesheetService,
    private utils: UtilsService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.timesheetForm = this.fb.group({
      id: [null],
      userid: [null, Validators.required],
      activityid: [null, Validators.required],
      dtstart: ['', Validators.required],
      dtend: [''],
      detail: ['', Validators.maxLength(500)]
    });

    if (this.timesheet) {
      this.currentUser = this.timesheet.userid;
      this.currentActivity = this.timesheet.activityid;
      this.timesheet.dtstart = this.timesheet.dtstart ? this.utils.formatDate(this.timesheet.dtstart, true) : '';
      this.timesheet.dtend = this.timesheet.dtend ? this.utils.formatDate(this.timesheet.dtend, true) : '';
      this.timesheetCopy = { ...this.timesheet };
      this.timesheetForm.patchValue({ ...this.timesheet });
    }

    this.loadUsers();
    this.loadActivities();
  }

  onActivitySelected(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const activityId = parseInt(target.value, 10);
    this.currentActivity = activityId;
    this.timesheetForm.patchValue({ activityid: activityId });
  }

  onUserSelected(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const userId = parseInt(target.value, 10);
    this.currentUser = userId;
    this.timesheetForm.patchValue({ userid: userId });
  }

  onSubmit(): void {
    if (this.timesheetForm.valid) {
      this.timesheet = this.timesheetForm.value;
      this.confirmSave();
    } else {
      console.log('Form non valido');
      this.timesheetForm.markAllAsTouched();
    }
  }

  save(): void {
    const timesheetData = { ...this.timesheetForm.value };
    timesheetData.dtstart = this.utils.formatDate(timesheetData.dtstart, true);
    timesheetData.dtend = this.utils.formatDate(timesheetData.dtend, true);

    if (timesheetData.id) {
      this.timesheetService.updateTimesheet(timesheetData).subscribe({
        next: () => {
          console.log('Aggiornamento completato con successo');
          this.reload.emit(true);
          this.activeModal.close();
        },
        error: (error: any) => {
          console.error('Errore durante l\'aggiornamento', error);
          alert('Errore durante l\'aggiornamento.');
        }
      });
    } else {
      this.timesheetService.save(timesheetData).subscribe({
        next: () => {
          console.log('Creazione completata con successo');
          this.reload.emit(true);
          this.activeModal.close();
        },
        error: (error: any) => {
          console.error('Errore durante la creazione', error);
          alert('Errore durante la creazione.');
        }
      });
    }
  }

  resetForm(): void {
    this.timesheet = { ...this.timesheetCopy };
    this.timesheetForm.reset(this.timesheet);
  }

  loadUsers(): void {
    // Logica per caricare l'elenco degli utenti
  }

  loadActivities(): void {
    // Logica per caricare l'elenco delle attività
  }

  // Gestione dei dialog di conferma
  cancelSave(): void {
    this.showSaveDialog = false;
  }

  confirmSave(): void {
    this.showSaveDialog = true;
  }

  cancelDelete(): void {
    this.showDeleteDialog = false;
  }

  confirmDelete(): void {
    this.showDeleteDialog = true;
  }

  openDeleteConfirmation(): void {
    this.showDeleteDialog = true;
  }
}
