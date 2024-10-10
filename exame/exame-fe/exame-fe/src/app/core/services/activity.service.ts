import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Activity } from '../models/activity.model';
import { HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private readonly endpoint = 'activity';
  private activityList: Activity[] = [];

  constructor(
    private apiService: ApiService
  ) { }
  
  save(_activity: Activity): Observable<Activity> {
    
    const _endpoint = this.endpoint;
    
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json'
    });

    return this.apiService.post<Activity>(_endpoint, _activity, headers).pipe(
      map(response => response) // Il mapping può essere opzionale
    );
  }

  update(_activity: Activity): Observable<Activity> {
    const _endpoint = this.endpoint;
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json'
    });

    return this.apiService.post<Activity>(_endpoint, _activity, headers).pipe(
      map(response => response) // Il mapping può essere opzionale
    );
  }

  delete(_activity: Activity): Observable<void> {
    const _endpoint = `${this.endpoint}/${_activity.id}`;
  
    return this.apiService.delete(_endpoint).pipe(
      map(() => {})
    );
  }

  fill(): Observable<Activity[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const _endpoint = this.endpoint;

    return this.apiService.get<Activity[]>(_endpoint, headers).pipe(
      map((response: Activity[]) => {
        // Eventuale logica per trasformare i dati
        return response;
      })
    );
  }

  getActivityList(): Activity[] {
    return this.activityList;
  }

  findById(id: number): Activity | undefined {
    return this.activityList.find(ac => ac.id == id);
  }
}
