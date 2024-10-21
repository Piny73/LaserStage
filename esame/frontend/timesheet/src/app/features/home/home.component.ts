import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Importazione NgbModal
import { switchMap } from 'rxjs';
import { Activity } from '../../core/models/activity.model';
import { TimeSheet } from '../../core/models/timesheet.model';
import { User } from '../../core/models/user.model';
import { ActivityService } from '../../core/services/activity.service';
import { TimesheetService } from '../../core/services/timesheet.service';
import { UserService } from '../../core/services/user.service';
import { ActivityFormComponent } from '../activity-list/activity-form/activity-form.component';
import { TimesheetFormComponent } from '../timesheet-list/timesheet-form/timesheet-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLoading: boolean = true;
  activityData: { data: Activity[] } = { data: [] };
  timeSheetData: { data: TimeSheet[] } = { data: [] };
  userData: { data: User[] } = { data: [] };
  selectedActivity!: Activity;  // Aggiunto: memorizza l'attività selezionata
  selectedTimesheet!: TimeSheet;  // Memorizza il timesheet selezionato

  constructor(
    public activityService: ActivityService,
    private timeSheetService: TimesheetService,
    private userService: UserService,
    private modalService: NgbModal // Servizio per gestire il modal
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.activityService.fill()
      .pipe(
        switchMap(activities => {
          this.activityData.data = activities;
          return this.userService.fill();
        })
      )
      .subscribe({
        next: (user) => {
          this.userData.data = user;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error Load Data', err);
          this.isLoading = false;
        }
      });
  }

  // Aggiunto: seleziona un'attività e la memorizza
  selectActivity(activity: Activity) {
    this.selectedActivity = activity;  // Memorizza l'attività selezionata
    console.log('Attività selezionata:', activity);  // Solo per debug, puoi rimuoverlo
  }

  // Aggiunto: seleziona un timesheet e lo memorizza
  selectTimesheet(timesheet: TimeSheet): void {
    this.selectedTimesheet = timesheet;  // Memorizza il timesheet selezionato
    console.log('Timesheet selezionato:', timesheet);  // Solo per debug, puoi rimuoverlo
  }

  // Aggiunto: ricarica i dati se necessario
  reload(shouldReload: boolean) {
    if (shouldReload) {
      this.loadData();  // Ricarica i dati
    }
  }

  // Funzione per aprire il modal per la creazione o modifica di un'attività
  openActivityModal(activity?: Activity) {
    const modalRef = this.modalService.open(ActivityFormComponent, { size: 'lg' });

    if (activity) {
      modalRef.componentInstance.activity = { ...activity }; // Clona l'attività per evitare modifiche in-place
    } else {
      modalRef.componentInstance.activity = new Activity(); // Inizializza una nuova attività vuota
    }

    // Subscrivi al risultato del form, ricarica l'elenco delle attività se un'attività viene creata o aggiornata
    modalRef.componentInstance.reload.subscribe((shouldReload: boolean) => {
      if (shouldReload) {
        this.loadData(); // Ricarica i dati se richiesto
      }
    });

    modalRef.result.then(
      () => {
        // Modal chiuso, ricarica le attività se necessario
        this.loadData();
      },
      (reason) => {
        console.log('Modal chiuso senza salvataggio:', reason);
      }
    );
  }

  // Funzione per aprire il modal per la creazione o modifica di un timesheet
  openTimesheetModal(timesheet?: TimeSheet) {
    const modalRef = this.modalService.open(TimesheetFormComponent, { size: 'lg' });

    if (timesheet) {
      modalRef.componentInstance.timesheet = { ...timesheet }; // Clona il timesheet per evitare modifiche in-place
    } else {
      modalRef.componentInstance.timesheet = new TimeSheet(); // Inizializza un nuovo timesheet vuoto
    }

    // Subscrivi al risultato del form, ricarica l'elenco dei timesheet se uno viene creato o aggiornato
    modalRef.componentInstance.reload.subscribe((shouldReload: boolean) => {
      if (shouldReload) {
        this.loadData(); // Ricarica i dati se richiesto
      }
    });

    modalRef.result.then(
      () => {
        // Modal chiuso, ricarica i timesheet se necessario
        this.loadData();
      },
      (reason) => {
        console.log('Modal chiuso senza salvataggio:', reason);
      }
    );
  }
}
