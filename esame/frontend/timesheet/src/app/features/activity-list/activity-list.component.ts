import { Component, EventEmitter, inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, map, Observable, startWith, Subscription } from 'rxjs';
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
  styleUrls: ['./activity-list.component.css'] // Corretto da styleUrl a styleUrls
})
export class ActivityListComponent implements OnInit, OnDestroy, OnChanges {
  
  private modalService = inject(NgbModal);
  
  @Output() onSelectActivity = new EventEmitter<Activity>();
  @Input() isUpdated!: number;

  title = 'Activity';
  activityData$!: Observable<ActivityData>;
  selectedActivity!: Activity;
  private subscription!: Subscription;

  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.load();
  }

  ngOnChanges(changes: SimpleChanges) {
    let cur_up = changes['isUpdated'].currentValue != null ? changes['isUpdated'].currentValue : 0;
    let cur_last = changes['isUpdated'].previousValue != null ? changes['isUpdated'].previousValue : 0;

    if (cur_up > cur_last) {
      this.load();
    }
  }

  load(): void {
    this.activityData$ = this.activityService.fill().pipe(
      map((data: Activity[]) => {
        return {
          loading: false,
          activityList: data,
          error: null
        };
      }),
      catchError(error => {
        console.error('Error:', error);
        return [{
          loading: false,
          activityList: null,
          error: 'Error.'
        }];
      }),
      startWith({ loading: true, activityList: null, error: null })
    );

    this.subscription = this.activityData$.subscribe(data => {
      if (data.activityList) {
        // Fai qualcosa con l'elenco delle attività, se necessario
      }
    });
  }

  selectActivity(ac: Activity) {
    this.onSelectActivity.emit(ac); // Emissione dell'evento quando un'attività viene selezionata
  }

  openDetail(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'xl' });
  }

  openNew(content: TemplateRef<any>) {
    this.selectedActivity = new Activity({}); // Passa un oggetto vuoto al costruttore
    this.modalService.open(content, { size: 'xl' });
  }

  reload(load: boolean) {
    this.modalService.dismissAll();
    console.log("reload.0");
    if (load) {
      console.log("Reload.1");
      this.load();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
