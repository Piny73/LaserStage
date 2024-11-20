import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { Activity } from '../../core/models/activity.model';
import { ActivityService } from '../../core/services/activity.service';
import { AuthService } from '../../core/auth.service';

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
  activities: Activity[] = []; // Assicurati di avere il modello Activity
  errorMessage: string = '';
  private modalService = inject(NgbModal);

  @Output() onSelectActivity = new EventEmitter<Activity>();
  @Input() isUpdated!: number;
  @ViewChild('content', { static: true }) content!: TemplateRef<any>;

  title = 'Activity';
  activityData$!: Observable<ActivityData>;
  selectedActivity: Activity | null = null;

  searchTerm: string = '';
  sortOrder: string = 'asc';

  filteredActivities: Activity[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  constructor(private activityService: ActivityService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadActivities();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isUpdated']) {
      this.loadActivities();
    }
  }

  loadActivities(): void {
    this.activityData$ = this.activityService.fill().pipe(
      map((data: Activity[]) => {
        const currentUser = this.authService.getCurrentUser(); // Recupera l'utente loggato
        const userActivities = currentUser // Filtra le attività per l'utente attualmente loggato
          ? data.filter(activity => activity.ownerid === currentUser.id) 
          : [];
  
        this.totalItems = userActivities.length;
        this.filteredActivities = userActivities; // Memorizza le attività filtrate
        this.updatePageActivities();
        return {
          loading: false,
          activityList: userActivities,
          error: null,
        };
      }),
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
  updatePageActivities(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredActivities = this.filteredActivities.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePageActivities();
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  selectActivity(activity: Activity): void {
    this.selectedActivity = activity; 
    this.onSelectActivity.emit(activity);
  }

  deleteActivity(activity: Activity): void {
    if (activity.id && confirm(`Sei sicuro di voler eliminare l'attività "${activity.description}" di "${activity.ownerName}"?`)) {
      this.activityService.delete(activity.id).subscribe({
        next: () => {
          this.loadActivities(); 
          this.selectedActivity = null; // Deseleziona dopo l'eliminazione
        },
        error: (error: any) => {
          console.error('Errore durante l\'eliminazione dell\'attività', error);
        }
      });
    }
  }

  openDetail(content: TemplateRef<any>, activity?: Activity): void {
    this.activityService.setActivitySelected(activity!);
    this.modalService.open(content, { size: 'xl' });
  }

  openNew(content: TemplateRef<any>): void {
    this.selectedActivity = null; 
    this.modalService.open(content, { size: 'xl' });
  }

  filterActivities(): void {
    this.activityData$.subscribe(data => {
      const allActivities = data.activityList || [];
      this.filteredActivities = allActivities.filter(activity => 
        activity.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.totalItems = this.filteredActivities.length;
      this.currentPage = 1; 
      this.updatePageActivities();
    });
  }

  sortActivities(): void {
    this.filteredActivities.sort((a, b) => {
      const dateA = a.dtstart ? new Date(a.dtstart).getTime() : 0;
      const dateB = b.dtstart ? new Date(b.dtstart).getTime() : 0;
      return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    this.updatePageActivities(); 
  }
}