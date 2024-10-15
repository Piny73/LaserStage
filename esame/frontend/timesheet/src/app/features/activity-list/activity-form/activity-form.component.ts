import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Activity } from '../../../core/models/activity.model';
import { ActivityService } from '../../../core/services/activity.service';
import { UtilsService } from '../../../core/utils.service';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css']
})
export class ActivityFormComponent implements OnInit {
  
  activityForm!: FormGroup;
  currentOwner!: number | null;
  showSaveDialog = false;
  showDeleteDialog = false;

  @Input() activity!: Activity; // Riceve l'attività da modificare o una nuova da creare
  @Output() reload = new EventEmitter<boolean>(); // Evento per ricaricare la lista

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private utils: UtilsService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    if (this.activity) {
      this.populateFormWithActivityData();
    }
  }

  private initializeForm(): void {
    this.activityForm = this.fb.group({
      id: [0], // Imposta l'ID a 0 per default (nuova attività)
      description: ['', Validators.required], // Campo descrizione obbligatorio
      ownerid: [0, Validators.required], // Campo proprietario obbligatorio
      dtstart: ['', Validators.required], // Campo data di inizio obbligatorio
      dtend: [''], // Campo data di fine opzionale
      enable: [false] // Impostazione predefinita a false
    });
  }

  private populateFormWithActivityData(): void {
    this.currentOwner = this.activity.ownerid;
    this.activity.dtstart = this.activity.dtstart ? this.utils.formatDate(this.activity.dtstart, true) : null;
    this.activity.dtend = this.activity.dtend ? this.utils.formatDate(this.activity.dtend, true) : null;

    this.activityForm.patchValue({
      ...this.activity
    });
  }

  // Gestisce l'invio del form
  onSubmit(): void {
    if (this.activityForm.valid) {
      this.showSaveDialog = true; // Mostra la finestra di conferma salvataggio
    } else {
      console.log('Form non valido');
      this.activityForm.markAllAsTouched(); // Mostra i messaggi di errore
    }
  }

  confirmSave(): void {
    const formattedDateStart = this.activityForm.value.dtstart ? new Date(this.activityForm.value.dtstart).toISOString() : null;
    const formattedDateEnd = this.activityForm.value.dtend ? new Date(this.activityForm.value.dtend).toISOString() : null;

    const activityData = {
      ...this.activityForm.value,
      dtstart: formattedDateStart,
      dtend: formattedDateEnd
    };

    if (activityData.id && activityData.id !== 0) {
      this.updateActivity(activityData);
    } else {
      this.createActivity(activityData);
    }
    this.showSaveDialog = false; // Chiudi la finestra di conferma
  }

  private updateActivity(activityData: any): void {
    this.activityService.update(activityData).subscribe({
      next: () => {
        console.log('Aggiornamento completato con successo');
        this.reload.emit(true); // Ricarica la lista
        this.activeModal.close(); // Chiudi il modal
      },
      error: (error) => {
        console.error('Errore durante l\'aggiornamento', error);
        alert('Errore durante l\'aggiornamento.');
      }
    });
  }

  private createActivity(activityData: any): void {
    this.activityService.save(activityData).subscribe({
      next: () => {
        console.log('Creazione completata con successo');
        this.reload.emit(true); // Ricarica la lista
        this.activeModal.close(); // Chiudi il modal
      },
      error: (error: any) => {
        console.error('Errore durante la creazione', error);
        alert('Errore durante la creazione.');
      }
    });
  }

  deleteObject(): void {
    if (this.activity.id && this.activity.id !== 0) {
      this.activityService.delete(this.activity.id).subscribe({
        next: () => {
          console.log('Eliminazione completata con successo');
          this.resetActivityData();
          this.reload.emit(true); // Ricarica la lista
          this.activeModal.close(); // Chiudi il modal
        },
        error: (error: any) => {
          console.error('Errore durante l\'eliminazione', error);
          alert('Errore durante l\'eliminazione.');
        }
      });
    } else {
      console.warn('Tentativo di eliminazione con ID non valido:', this.activity.id);
    }
  }

  private resetActivityData(): void {
    this.activity = new Activity({});
    this.currentOwner = null;
  }

  confirmDelete(): void {
    this.showDeleteDialog = false;
    this.deleteObject(); // Chiama la funzione di eliminazione
  }

  cancelSave(): void {
    this.showSaveDialog = false;
  }

  cancelDelete(): void {
    this.showDeleteDialog = false;
  }

  resetForm(form?: FormGroup): void {
    if (form) {
      form.reset(this.activity); // Usa il form passato come argomento
    } else {
      this.activityForm.reset(this.activity); // Usa il form del componente
    }
  }

  newObject(): void {
    this.activity = new Activity({});
    this.currentOwner = null;
    this.activityForm.patchValue(this.activity); // Inizializza il form con una nuova attività
  }

  onOwnerSelected(event: number): void {
    console.log('Proprietario selezionato:', event);
    this.currentOwner = event; // Aggiorna currentOwner con l'ID dell'utente selezionato
    this.activityForm.patchValue({ ownerid: this.currentOwner }); // Imposta l'ownerid nel form
  }

  openDeleteConfirmation(): void {
    console.log('Conferma di eliminazione aperta');
    this.showDeleteDialog = true; // Mostra la finestra di conferma eliminazione
  }
}



