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
  private activityCopy!: Activity;
  currentOwner!: number | null;
  showSaveDialog = false;
  showDeleteDialog = false;

  @Input() activity!: Activity; // Riceve l'attività selezionata o una nuova da creare
  @Output() reload = new EventEmitter<boolean>(); // Evento per ricaricare la lista delle attività

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private utils: UtilsService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.initializeForm();

    // Popola il form con i dati dell'attività se già esistente
    if (this.activity) {
      this.populateFormWithActivityData();
    }
  }

  // Inizializzazione del FormGroup
  private initializeForm(): void {
    this.activityForm = this.fb.group({
      id: [0],
      description: ['', Validators.required],
      ownerid: [0, Validators.required],
      dtstart: ['', Validators.required],
      dtend: [''],
      enable: [false] // Assicurati che 'enable' sia presente con un valore di default (false)
    });
  }

  // Popola il form con i dati dell'attività selezionata
  private populateFormWithActivityData(): void {
    this.currentOwner = this.activity.ownerid;



    // Usa UtilsService per formattare le date
    this.activity.dtstart = this.activity.dtstart
      ? this.utils.formatDateForBackend(new Date(this.activity.dtstart))
      : null;

    this.activity.dtend = this.activity.dtend
      ? this.utils.formatDateForBackend(new Date(this.activity.dtend))
      : null;

    // Verifica e log dell'ID dell'attività
    if (!this.activity.id) {
      console.warn('Attenzione: L\'attività non ha un ID valido:', this.activity);
    }

    // Assicurati che l'oggetto activity abbia un ID prima di procedere
    this.activityCopy = { ...this.activity };

    // Aggiorna il form con i dati dell'attività
    this.activityForm.patchValue({
      id: this.activity.id || 0,  // Assicurati che l'ID venga popolato
      description: this.activity.description,
      ownerid: this.activity.ownerid,
      dtstart: this.activity.dtstart,
      dtend: this.activity.dtend,
      enable: this.activity.enable,

    });

    console.log('Form popolato con dati attività:', this.activityForm.value);
  }

  // Gestisce l'invio del form
  onSubmit(): void {
    if (this.activityForm.valid) {
      this.activity = this.activityForm.value;
      this.showSaveDialog = true; // Mostra dialog di conferma
    } else {
      console.log('Form non valido');
      this.activityForm.markAllAsTouched(); // Mostra errori
    }
  }

  // Salva i dati dell'attività (crea o aggiorna)
  save(): void {
    // Recupera le date dal form
    const dtstart = this.activityForm.value.dtstart ? new Date(this.activityForm.value.dtstart) : null;
    const dtend = this.activityForm.value.dtend ? new Date(this.activityForm.value.dtend) : null;

    // Converte le date per preservare l'ora locale e rimuovi i secondi
    const formattedDateStart = dtstart ? new Date(dtstart.getTime() - dtstart.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : null;
    const formattedDateEnd = dtend ? new Date(dtend.getTime() - dtend.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : null;

    // Aggiungi esplicitamente il campo enable al payload
    const activityData = {
      ...this.activityForm.value,
      dtstart: formattedDateStart,
      dtend: formattedDateEnd,
      enable: this.activityForm.value.enable !== undefined ? this.activityForm.value.enable : false
    };

    console.log('Payload inviato:', activityData);  // Verifica il payload che viene inviato

    if (activityData.id) {
      this.updateActivity(activityData);
    } else {
      this.createActivity(activityData);
    }
  }

  // Aggiorna un'attività esistente
  private updateActivity(activityData: any): void {
    this.activityService.update(activityData).subscribe({
      next: () => {
        console.log('Aggiornamento completato');
        this.reload.emit(true); // Ricarica la lista
        this.activeModal.close(); // Chiudi il modal
      },
      error: (error) => {
        console.error('Errore durante l\'aggiornamento', error);
        alert('Errore durante l\'aggiornamento.');
      }
    });
  }

  // Crea una nuova attività
  private createActivity(activityData: any): void {
    this.activityService.save(activityData).subscribe({
      next: () => {
        console.log('Creazione completata');
        this.reload.emit(true); // Ricarica la lista
        this.activeModal.close(); // Chiudi il modal
      },
      error: (error: any) => {
        console.error('Errore durante la creazione', error);
        alert('Errore durante la creazione.');
      }
    });
  }

  // Elimina l'attività corrente
  deleteObject(): void {
    const activityId = this.activityForm.value.id;

    if (activityId && activityId !== 0) {
      console.log('Tentativo di eliminazione dell\'attività con ID:', activityId); // Verifica l'ID
      this.activityService.delete(activityId).subscribe({
        next: () => {
          console.log('Attività eliminata con successo:', activityId);
          this.reload.emit(true); // Ricarica la lista delle attività
          this.activeModal.close(); // Chiudi il modal
        },
        error: (error: any) => {
          console.error('Errore durante l\'eliminazione dell\'attività', error);
          alert('Errore durante l\'eliminazione.');
        }
      });
    } else {
      console.warn('ID non valido per la cancellazione:', activityId);
    }
  }
  // Resetta i dati dell'attività
  private resetActivityData(): void {
    this.activity = new Activity();
    this.activityCopy = new Activity();
    this.currentOwner = null;
  }

  // Conferma il salvataggio
  confirmSave(): void {
    this.showSaveDialog = false;
    this.save();
  }

  // Conferma l'eliminazione
  confirmDelete(): void {
    this.showDeleteDialog = false;
    this.deleteObject();
  }

  // Annulla il salvataggio
  cancelSave(): void {
    this.showSaveDialog = false;
  }

  // Annulla l'eliminazione
  cancelDelete(): void {
    this.showDeleteDialog = false;
  }

  // Resetta il form
  resetForm(): void {
    this.activityForm.reset({
      id: 0,
      description: '',
      ownerid: null,
      dtstart: '',
      dtend: '',
      enable: false
    });
  }

  // Gestisce la selezione del proprietario
  onOwnerSelected(event: any): void {
    this.activityForm.patchValue({ ownerid: event });
    console.log('Proprietario selezionato:', event);
  }

  // Apre il dialog di conferma eliminazione
  openDeleteConfirmation(): void {
    this.showDeleteDialog = true;
  }

  // Aggiungi la gestione della selezione di un'attività
  selectActivity(activity: Activity): void {
    console.log('Attività selezionata:', activity); // Verifica che l'attività includa ownerid
    this.activityForm.patchValue({
      id: activity.id,
      description: activity.description,
      ownerid: activity.ownerid,
      dtstart: activity.dtstart,
      dtend: activity.dtend,
      enable: activity.enable
    });
  }
}







/*import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  private activityCopy!: Activity;
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

  // Inizializza il FormGroup con i campi e le loro validazioni
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

  // Popola il form con i dati dell'attività passata come input
  private populateFormWithActivityData(): void {
    this.currentOwner = this.activity.ownerid;
    this.activity.dtstart = this.activity.dtstart ? this.utils.formatDate(this.activity.dtstart, true) : null;
    this.activity.dtend = this.activity.dtend ? this.utils.formatDate(this.activity.dtend, true) : null;
    this.activityCopy = { ...this.activity };

    // Aggiorna il form con i valori dell'attività esistente
    this.activityForm.patchValue({
      ...this.activity
    });
  }

  // Gestisce l'invio del form
  onSubmit(): void {
    if (this.activityForm.valid) {
      this.activity = this.activityForm.value; // Assegna i valori dal form all'attività
      this.confirmSave(); // Chiede conferma per il salvataggio
    } else {
      console.log('Form non valido');
      this.activityForm.markAllAsTouched(); // Mostra i messaggi di errore
    }
  }

  // Salva i dati dell'attività
  save(): void {
    const formattedDateStart = new Date(this.activityForm.value.dtstart).toISOString();
    const formattedDateEnd = new Date(this.activityForm.value.dtend).toISOString();

    const activityData = {
      ...this.activityForm.value,
      dtstart: formattedDateStart,
      dtend: formattedDateEnd
    };

    if (activityData.id) {
      this.updateActivity(activityData);
    } else {
      this.createActivity(activityData);
    }
  }

  // Aggiorna un'attività esistente
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

  // Crea una nuova attività
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

  // Elimina l'attività corrente
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

  // Resetta i dati dell'attività
  private resetActivityData(): void {
    this.activity = new Activity();
    this.activityCopy = new Activity();
    this.currentOwner = null;
  }

  // Conferma il salvataggio
  confirmSave(): void {
    this.showSaveDialog = false;
    this.save(); // Chiama la funzione di salvataggio
  }

  // Conferma l'eliminazione
  confirmDelete(): void {
    this.showDeleteDialog = false;
    this.deleteObject(); // Chiama la funzione di eliminazione
  }

  // Annulla il salvataggio
  cancelSave(): void {
    this.showSaveDialog = false;
  }

  // Annulla l'eliminazione
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

  // Nuova attività
  newObject(): void {
    this.activity = new Activity();
    this.currentOwner = null;
    this.activityForm.patchValue(this.activity); // Inizializza il form con una nuova attività
  }

  onOwnerSelected(event: any): void {
    console.log('Proprietario selezionato:', event);
  }

  openDeleteConfirmation(): void {
    console.log('Conferma di eliminazione aperta');
  }
}


*/












/*
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
    this.activity = new Activity({}); // Inizializza un nuovo oggetto Activity
    this.currentOwner = null; // Resetta il proprietario attuale
    this.activityForm.reset(); // Resetta il modulo
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


*/

