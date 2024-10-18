import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private readonly endpoint = 'activity'; // Assicurati che questo corrisponda all'endpoint del BE
  private activityList: Activity[] = []; // Memorizzazione locale della lista delle attività

  constructor(
    private apiService: ApiService
  ) {}

  

  // Metodo per salvare una nuova attività
  save(activity: Activity): Observable<Activity> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json'
    });

    return this.apiService.post<Activity>(this.endpoint, activity, headers).pipe(
      map(response => response)
    );
  }

  // Metodo per aggiornare un'attività esistente
  update(activity: Activity): Observable<Activity> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json'
    });

    return this.apiService.put<Activity>(`${this.endpoint}/${activity.id}`, activity, headers).pipe(
      map(response => response)
    );
  }

  // Metodo per eliminare un'attività
  delete(activityId: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${activityId}`).pipe(
      map(() => {})
    );
  }

  // Metodo per ottenere la lista di tutte le attività dal backend
  fill(): Observable<Activity[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.apiService.get<Activity[]>(this.endpoint, headers).pipe(
      map((response: Activity[]) => {
        this.activityList = response; // Aggiorna la lista locale
        return response;
      })
    );
  }

  // Metodo per ottenere la lista delle attività memorizzata localmente
  getActivityList(): Activity[] {
    return this.activityList;
  }

  // Metodo per trovare un'attività per ID dalla lista locale
  findById(id: number): Activity | undefined {
    return this.activityList.find(ac => ac.id === id);
  }

  // Metodo per ottenere una singola attività dal backend (non memorizzata localmente)
  getByIdFromBackend(id: number): Observable<Activity> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.apiService.get<Activity>(`${this.endpoint}/${id}`, headers).pipe(
      map(response => response)
    );
  }
}









/*import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private readonly endpoint = 'activity'; // Assicurati che questo corrisponda all'endpoint del BE
  activityList: Activity[] = []; // Inizializzazione come array vuoto


  constructor(
    private apiService: ApiService
  ) { }

  // Metodo per salvare una nuova attività
  save(activity: Activity): Observable<Activity> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Invia la richiesta POST al backend
    return this.apiService.post<Activity>(this.endpoint, activity, headers).pipe(
      map(response => response) // Questo mapping può essere opzionale, ma aiuta a trasformare la risposta se necessario
    );
  }

  // Metodo per aggiornare un'attività esistente
  update(activity: Activity): Observable<Activity> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Invia la richiesta PUT al backend con l'ID dell'attività
    return this.apiService.put<Activity>(`${this.endpoint}/${activity.id}`, activity, headers).pipe(
      map(response => response)
    );
  }

  // Metodo per eliminare un'attività
  delete(activityId: number): Observable<void> {
    // L'endpoint include l'ID dell'attività da eliminare
    return this.apiService.delete<void>(`${this.endpoint}/${activityId}`).pipe(
      map(() => { })
    );
  }

  // Metodo per ottenere la lista di tutte le attività dal backend
  fill(): Observable<Activity[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Ottiene tutte le attività dall'endpoint
    return this.apiService.get<Activity[]>(this.endpoint, headers).pipe(
      map((response: Activity[]) => {
        return response;
      })
    );
  }

  // Metodo per ottenere la lista delle attività memorizzata localmente
  getActivityList(): Activity[] {
    return this.activityList;
  }

  // Metodo per trovare un'attività per ID dalla lista locale
  findById(id: number): Activity | undefined {
    return this.activityList.find(ac => ac.id === id);
  }
}
  */





