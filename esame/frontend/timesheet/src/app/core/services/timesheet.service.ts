import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { TimeSheet } from '../models/timesheet.model';

@Injectable({
  providedIn: 'root',
})
export class TimesheetService {
  private readonly endpoint = 'timesheet';
  private timesheetList: TimeSheet[] = [];

  constructor(private apiService: ApiService, private authService: AuthService) {}

  // Metodo per ottenere tutti i timesheet
  getAllTimesheets(): Observable<TimeSheet[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.apiService.get(this.endpoint, headers).pipe(
      map((response: any[]) => {
        if (Array.isArray(response)) {
          this.timesheetList = response.map((data: any) => {
            return new TimeSheet({
              id: data.id,
              detail: data.detail,
              dtstart: data.dtstart,
              dtend: data.dtend,
              userid: data.userid,
              activityid: data.activityid,
            });
          });
          return this.timesheetList;
        } else {
          console.error('La risposta dell\'API non è un array');
          return [];
        }
      })
    );
  }

  // Metodo per creare un nuovo timesheet
  createTimesheet(_timeSheet: TimeSheet): Observable<TimeSheet> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.apiService.post(this.endpoint, _timeSheet, headers).pipe(
      map(response => response)
    );
  }

  // Metodo per aggiornare un timesheet
  updateTimesheet(id: number, _timeSheet: TimeSheet): Observable<TimeSheet> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const _endpoint = `${this.endpoint}/${_timeSheet.id}`;
    return this.apiService.put(_endpoint, _timeSheet, headers).pipe(
      map(response => response)
    );
  }

  // Metodo per eliminare un timesheet
  deleteTimesheet(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const _endpoint = `${this.endpoint}/${id}`;
    return this.apiService.delete(_endpoint, headers).pipe(
      map(() => {})
    );
  }

  fill(): Observable<TimeSheet[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const _endpoint = `${this.endpoint}/${this.authService.getUser()?.id}`;

    return this.apiService.get(_endpoint, headers).pipe(
      map((response: any[]) => {
        if (Array.isArray(response)) {
          this.timesheetList = response.map((data: any) => {
            return new TimeSheet({
              id: data.id,
              detail: data.detail,
              dtstart: data.dtstart,
              dtend: data.dtend,
              userid: data.userid,
              activityid: data.activityid,
            });
          });
          return this.timesheetList;
        } else {
          console.error('La risposta dell\'API non è un array');
          return [];
        }
      })
    );
  }

  getActivityList(): TimeSheet[] {
    return this.timesheetList;
  }
  delete(id: number): Observable<void> {
    const _endpoint = `${this.endpoint}/${id}`;
    return this.apiService.delete(_endpoint).pipe(
      map(response => response) // Assicurati che il tuo `apiService.delete` gestisca la richiesta correttamente
    );
  }
  
  
  findById(id: number): TimeSheet | undefined {
    return this.timesheetList.find(ts => ts.id === id);
  }
}

