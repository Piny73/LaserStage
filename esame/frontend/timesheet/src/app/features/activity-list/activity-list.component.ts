import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { Activity } from '../../core/models/activity.model';
import { ActivityService } from '../../core/services/activity.service';

interface ActivityData {
  loading: boolean;
  activityList: Activity[] | null;
  error: string | null;
}

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit, OnChanges {

  private modalService = inject(NgbModal);

  @Output() onSelectActivity = new EventEmitter<Activity>();
  @Input() isUpdated!: number;
  @ViewChild('content', { static: true }) content!: TemplateRef<any>;

  title = 'Activity';
  activityData$!: Observable<ActivityData>;
  selectedActivities: Activity[] = []; // Gestione della selezione multipla di attività

  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.load();
  }

  ngOnChanges(changes: SimpleChanges) {
    const cur_up = changes['isUpdated'].currentValue != null ? changes['isUpdated'].currentValue : 0;
    const cur_last = changes['isUpdated'].previousValue != null ? changes['isUpdated'].previousValue : 0;

    if (cur_up > cur_last) {
      this.load();
    }
  }

  load(): void {
    this.activityData$ = this.activityService.fill().pipe(
      map((data: Activity[]) => ({
        loading: false,
        activityList: data,
        error: null
      })),
      catchError(error => {
        console.error('Errore durante il caricamento delle attività:', error);
        return of({
          loading: false,
          activityList: null,
          error: 'Si è verificato un errore nel caricamento delle attività.'
        });
      }),
      startWith({ loading: true, activityList: null, error: null })
    );
  }

  // Selezione di una attività
  selectActivity(activity: Activity): void {
    if (activity.owner) {
      activity.ownerid = activity.owner.id; // Imposta correttamente l'ownerid dall'oggetto owner
    }
    this.onSelectActivity.emit(activity); // Emissione dell'evento con l'attività selezionata
  }

  // Metodo per cancellare una singola attività
  deleteActivity(activity: Activity): void {
    if (activity.id && confirm(`Sei sicuro di voler eliminare l'attività "${activity.description}" di "${activity.ownerName}"?`)) {
      console.log('Eliminazione dell\'attività con ID:', activity.id); // Debug per verificare l'ID
      this.activityService.delete(activity.id).subscribe({
        next: () => {
          console.log('Attività eliminata con successo:', activity.id);
          this.load(); // Ricarica la lista delle attività dopo la cancellazione
        },
        error: (error: any) => {
          console.error('Errore durante l\'eliminazione dell\'attività', error);
        }
      });
    } else {
      console.error('ID attività non valido o non presente:', activity.id);
    }
  }

  // Apertura del dettaglio/modifica dell'attività
  openDetail(content: TemplateRef<any>, activity?: Activity) {
    this.activityService.setActivitySelected(activity!); // Memorizza l'attività selezionata per la modifica
    this.modalService.open(content, { size: 'xl' });
  }

  // Apertura per creare una nuova attività
  openNew(content: TemplateRef<any>){
    this.selectedActivities = []; // Svuota la selezione per una nuova attività
    this.modalService.open(content, { size: 'xl' });
  }

  // Quando ricevi l'evento di reload, chiama load()
  reload(load: boolean) {
    if (load) {
      this.load(); // Ricarica la lista
    }
  }
}
