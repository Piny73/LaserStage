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
  isModalOpen: boolean = false; // Aggiungi questa proprietà
  activityData: { data: Activity[] } = { data: [] };
  timeSheetData: { data: TimeSheet[] } = { data: [] };
  userData: { data: User[] } = { data: [] };

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

  // Funzione per aprire il modal per la creazione o modifica di un'attività
  openActivityModal(activity?: Activity) {
    this.isModalOpen = true; // Imposta lo stato del modal come aperto
    const modalRef = this.modalService.open(ActivityFormComponent, { size: 'lg' });

    if (activity) {
      modalRef.componentInstance.activity = { ...activity }; // Clona l'attività per evitare modifiche in-place
    } else {
      modalRef.componentInstance.activity = new Activity({}); // Passa un oggetto vuoto al costruttore
    }

    // Subscrivi al risultato del form, ricarica l'elenco delle attività se un'attività viene creata o aggiornata
    modalRef.componentInstance.reload.subscribe((shouldReload: boolean) => {
      if (shouldReload) {
        this.loadData(); // Ricarica i dati se richiesto
      }
    });

    modalRef.result.then(
      () => {
        this.isModalOpen = false; // Imposta lo stato del modal come chiuso
        this.loadData();
      },
      (reason) => {
        this.isModalOpen = false; // Imposta lo stato del modal come chiuso
        console.log('Modal chiuso senza salvataggio:', reason);
      }
    );
  }

  // Funzione per aprire il modal per la creazione o modifica di un timesheet
  openTimesheetModal(timesheet?: TimeSheet) {
    this.isModalOpen = true; // Imposta lo stato del modal come aperto
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
        this.isModalOpen = false; // Imposta lo stato del modal come chiuso
        this.loadData();
      },
      (reason) => {
        this.isModalOpen = false; // Imposta lo stato del modal come chiuso
        console.log('Modal chiuso senza salvataggio:', reason);
      }
    );
  }
}



