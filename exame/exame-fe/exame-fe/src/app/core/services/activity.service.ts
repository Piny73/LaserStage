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

    return this.apiService.post(_endpoint, _activity, headers).pipe(
      map(response => response)
    ); 
  }

  update(_activity: Activity): Observable<Activity> {
    const _endpoint = this.endpoint;
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json'
    });

    return this.apiService.put(_endpoint, _activity, headers).pipe(
      map(response => response)
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

    return this.apiService.get(_endpoint, headers).pipe(
      map((response: any[]) => {
        if (Array.isArray(response)) {
          this.activityList = response.map((data: any) => {
            const ac = new Activity({
              id: data.id,
              description: data.description,
              dtstart: data.dtstart,
              dtend: data.dtend,
              ownerid: data.ownerid,
              enable:data.enable
            });
            return ac;
          });

          return this.activityList;
        } else {
          console.error('Resposta da API não é um array');
          return [];
        }
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
