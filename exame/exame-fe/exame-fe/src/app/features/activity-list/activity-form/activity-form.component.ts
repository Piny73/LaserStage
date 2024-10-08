import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Activity } from '../../../core/models/activity.model';
import { ActivityService } from '../../../core/services/activity.service';
import { UtilsService } from '../../../core/utils.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal

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

  @Input() activity!: Activity; // Riceve l'attività da modificare (o una nuova da creare)
  @Output() reload = new EventEmitter<boolean>(); // Evento per ricaricare la lista

  constructor(
    private fb: FormBuilder, 
    private activityService: ActivityService, 
    private utils: UtilsService,
    public activeModal: NgbActiveModal // NgbActiveModal per chiudere il modal
  ) {}

  ngOnInit(): void {
    this.activityForm = this.fb.group({
      id: [null],
      ownerid: [null],
      description: ['', Validators.required],
      dtstart: ['', Validators.required],
      dtend: [''],
      enable: ['']
    });

    if (this.activity) {
      // Se esiste un'attività, la copia e formatta le date
      this.currentOwner = this.activity.ownerid;
      this.activity.dtstart = this.activity.dtstart ? this.utils.formatDate(this.activity.dtstart, true) : null;
      this.activity.dtend = this.activity.dtend ? this.utils.formatDate(this.activity.dtend, true) : null;
      this.activityCopy = { ...this.activity };

      // Aggiorna il form con i valori dell'attività esistente
      this.activityForm.patchValue({
        ...this.activity
      });
    }
  }

  onSubmit(): void {
    if (this.activityForm.valid) {
      this.activity = this.activityForm.value; // Assegna i valori dal form all'attività
      this.confirmSave(); // Chiede conferma per il salvataggio
    } else {
      console.log('Form non valido');
      this.activityForm.markAllAsTouched(); // Mostra i messaggi di errore
    }
  }

  // Funzione di salvataggio
  save() {
    const _ac = { ...this.activityForm.value }; // Clona i valori del form

    // Formatta le date
    _ac.dtstart = this.utils.formatDate(_ac.dtstart, true);
    _ac.dtend = this.utils.formatDate(_ac.dtend, true);

    if (_ac.id) {
      // Se l'attività ha un ID, aggiorna
      this.activityService.update(_ac).subscribe({
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
    } else {
      // Se non ha un ID, crea una nuova attività
      this.activityService.save(_ac).subscribe({
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
  }

  // Funzione per cancellare l'attività
  deleteObject() {
    const _ac = { ...this.activity }; // Clona l'attività

    if (_ac.id && _ac.id !== 0) {
      this.activityService.delete(_ac).subscribe({
        next: () => {
          console.log('Eliminazione completata con successo');
          this.activity = new Activity(); // Resetta l'attività
          this.activityCopy = new Activity(); // Resetta la copia
          this.currentOwner = null;
          this.reload.emit(true); // Ricarica la lista
        },
        error: (error: any) => {
          console.error('Errore durante l\'eliminazione', error);
          alert('Errore durante l\'eliminazione.');
        }
      });
    } else {
      console.warn('Tentativo di eliminazione con ID non valido:', _ac.id);
    }
  }

  // Conferma il salvataggio
  confirmSave() {
    this.showSaveDialog = false;
    this.save(); // Chiama la funzione di salvataggio
  }

  // Conferma l'eliminazione
  confirmDelete() {
    this.showDeleteDialog = false;
    this.deleteObject(); // Chiama la funzione di eliminazione
  }

  // Annulla il salvataggio
  cancelSave() {
    this.showSaveDialog = false;
  }

  // Annulla l'eliminazione
  cancelDelete() {
    this.showDeleteDialog = false;
  }

  // Reset del form
  resetForm(form: FormGroup): void {
    this.activity = { ...this.activityCopy };
    this.activityForm.reset(this.activity); // Reset del form con i dati originali
  }

  // Nuova attività
  newObject(form: FormGroup): void {
    this.activity = new Activity();
    this.currentOwner = null;
    form.patchValue(this.activity); // Inizializza il form con una nuova attività
  }
  onOwnerSelected(event: any) {
    // Gestisci qui la logica di selezione del proprietario
    console.log('Proprietario selezionato:', event);
  }
  openDeleteConfirmation() {
    // Logica per aprire la finestra di conferma eliminazione
    console.log('Conferma di eliminazione aperta');
  }
}
