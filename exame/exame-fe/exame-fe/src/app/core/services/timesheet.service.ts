import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { TimeSheet } from '../models/timesheet.model';
import { HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  private readonly endpoint = 'timesheet';
  private timesheetList: TimeSheet[] = [];

  constructor(
    private apiService: ApiService, private authService : AuthService
  ) { }
  
  save(_timeSheet: TimeSheet): Observable<TimeSheet> {
    
    const _endpoint = this.endpoint;
       
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json'
    });

    return this.apiService.post(_endpoint, _timeSheet, headers).pipe(
      map(response => response)
    ); 
  }

  update(_timeSheet: TimeSheet): Observable<TimeSheet> {
    const _endpoint = this.endpoint;
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json'
    });

    return this.apiService.put(_endpoint, _timeSheet, headers).pipe(
      map(response => response)
    ); 
  }

  fill(): Observable<TimeSheet[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const _endpoint = `${this.endpoint}/${this.authService.getUser()?.id}`;
    

    return this.apiService.get(_endpoint, headers).pipe(
      map((response: any[]) => {
        if (Array.isArray(response)) {
          this.timesheetList = response.map((data: any) => {
            const ts = new TimeSheet({
              id: data.id,
              detail: data.detail,
              dtstart: data.dtstart,
              dtend: data.dtend,
              userid: data.userid,
              activityid:data.activityid
            });
            return ts;
          });

          return this.timesheetList;
        } else {
          console.error('Resposta da API não é um array');
          return [];
        }
      })
    );
  }

  getActivityList(): TimeSheet[] {
    return this.timesheetList;
  }

  findById(id: number): TimeSheet | undefined {
    return this.timesheetList.find(ts => ts.id == id);
  }


}
