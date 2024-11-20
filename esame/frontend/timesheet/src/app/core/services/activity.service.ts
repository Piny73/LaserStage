import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private readonly endpoint = 'activity'; // Endpoint per le attività
  private activityList: Activity[] = []; // Cache locale delle attività
  private activitySelected!: Activity; // Memorizza l'attività selezionata

  constructor(
    private apiService: ApiService
  ) {}

  // Metodo per salvare una nuova attività
  save(activity: Activity): Observable<Activity> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.apiService.post<Activity>(this.endpoint, activity, headers).pipe(
      tap(response => this.activityList.push(response)), // Aggiorna la cache
      catchError(this.handleError)
    );
  }

  // Metodo per aggiornare un'attività esistente
  update(activity: Activity): Observable<Activity> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.apiService.put<Activity>(`${this.endpoint}/${activity.id}`, activity, headers).pipe(
      tap(response => {
        const index = this.activityList.findIndex(a => a.id === activity.id);
        if (index > -1) {
          this.activityList[index] = response; // Aggiorna la cache
        }
      }),
      catchError(this.handleError)
    );
  }

  // Metodo per eliminare un'attività tramite il suo ID
  delete(activityId: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${activityId}`).pipe(
      tap(() => this.activityList = this.activityList.filter(a => a.id !== activityId)), // Rimuovi dalla cache
      catchError(this.handleError)
    );
  }

  // Metodo per ottenere la lista di tutte le attività dal backend
  fill(): Observable<Activity[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.apiService.get<Activity[]>(this.endpoint, headers).pipe(
      tap((response: Activity[]) => this.activityList = response), // Aggiorna la lista locale delle attività
      catchError(this.handleError)
    );
  }

  // Restituisce la lista locale delle attività
  getActivityList(): Activity[] {
    return this.activityList;
  }

  // Cerca un'attività nella lista locale tramite il suo ID
  findById(id: number): Activity | undefined {
    return this.activityList.find(activity => activity.id === id);
  }

  // Ottiene una singola attività dal backend tramite il suo ID
  getByIdFromBackend(id: number): Observable<Activity> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.apiService.get<Activity>(`${this.endpoint}/${id}`, headers).pipe(
      catchError(this.handleError)
    );
  }

  // Imposta l'attività selezionata
  setActivitySelected(activity: Activity): void {
    this.activitySelected = { ...activity }; // Memorizza una copia dell'attività selezionata
  }

  // Restituisce l'attività selezionata
  getActivitySelected(): Activity {
    return this.activitySelected;
  }

  // Cancella l'attività selezionata
  clearActivitySelected(): void {
    this.activitySelected = {} as Activity; // Resetta l'attività selezionata
  }

  // Metodo di gestione degli errori
  private handleError(error: any): Observable<never> {
    console.error('Errore durante la chiamata HTTP:', error);
    return throwError(() => new Error('Errore nella comunicazione con il server.'));
  }
}
