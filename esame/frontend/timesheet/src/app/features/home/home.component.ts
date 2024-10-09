import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Importazione NgbModal
import { switchMap } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import { Activity } from '../../core/models/activity.model';
import { TimeSheet } from '../../core/models/timesheet.model';
import { User } from '../../core/models/user.model';
import { ActivityService } from '../../core/services/activity.service';
import { TimesheetService } from '../../core/services/timesheet.service';
import { UserService } from '../../core/services/user.service';
import { ActivityFormComponent } from '../activity-list/activity-form/activity-form.component';



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

  constructor(
    public activityService: ActivityService,
    private timeSheetService: TimesheetService,
    private userService: UserService,
    private modalService: NgbModal, // Servizio per gestire il modal
    private authService: AuthService, // Aggiungi il servizio Auth
    private router: Router // Aggiungi il router
  ) { }

  isLoggedIn: boolean = false;

  ngOnInit() {
    this.isLoggedIn = !!this.authService.getUser(); // Verifica se l'utente è loggato
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.activityService.fill()
      .pipe(
        switchMap(activities => {
          this.activityData.data = activities;
          return this.timeSheetService.fill();
        }),
        switchMap((timesheet) => {
          this.timeSheetData.data = timesheet;
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
  // Metodo per il logout
  logout() {
    this.authService.logout(); // Chiama il logout dal servizio di autenticazione
    this.router.navigate(['/']); // Reindirizza al login
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
}
