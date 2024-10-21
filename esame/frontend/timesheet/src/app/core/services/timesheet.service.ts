import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Activity } from '../models/activity.model'; // Assicurati di avere questo modello
import { TimeSheetDTO } from '../models/timesheet.model';
import { User } from '../models/user.model'; // Assicurati di avere questo modello

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private baseUrl = 'timesheets';  // Endpoint dell'API per i timesheet
  private userUrl = 'users';        // Endpoint dell'API per gli utenti
  private activityUrl = 'activities';// Endpoint dell'API per le attività

  constructor(private http: HttpClient) {}

  // Metodo per ottenere tutti i timesheet
  getTimesheets(): Observable<TimeSheetDTO[]> {
    return this.http.get<TimeSheetDTO[]>(`${this.baseUrl}`).pipe(
      catchError(error => {
        console.error('Errore durante il recupero dei timesheet', error);
        return throwError(error);
      })
    );
  }

  // Metodo per salvare un nuovo timesheet
  save(timesheetData: TimeSheetDTO): Observable<TimeSheetDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<TimeSheetDTO>(`${this.baseUrl}`, timesheetData, { headers }).pipe(
      catchError(error => {
        console.error('Errore durante il salvataggio del timesheet', error);
        return throwError(error);
      })
    );
  }

  // Metodo per aggiornare un timesheet esistente
  updateTimesheet(timesheetData: TimeSheetDTO): Observable<TimeSheetDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<TimeSheetDTO>(`${this.baseUrl}/${timesheetData.id}`, timesheetData, { headers }).pipe(
      catchError(error => {
        console.error('Errore durante l\'aggiornamento del timesheet', error);
        return throwError(error);
      })
    );
  }

  // Metodo per eliminare un timesheet
  deleteTimesheet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Errore durante l\'eliminazione del timesheet', error);
        return throwError(error);
      })
    );
  }

  // Metodo per ottenere tutti gli utenti
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}`).pipe(
      catchError(error => {
        console.error('Errore durante il recupero degli utenti', error);
        return throwError(error);
      })
    );
  }

  // Metodo per ottenere tutte le attività
  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.activityUrl}`).pipe(
      catchError(error => {
        console.error('Errore durante il recupero delle attività', error);
        return throwError(error);
      })
    );
  }
}








/*
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeSheetDTO } from '../models/timesheet.model';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private baseUrl = 'timesheets';

  constructor(private http: HttpClient) {}

  // Metodo per ottenere tutti i timesheet
  getTimesheets(): Observable<TimeSheetDTO[]> {
    return this.http.get<TimeSheetDTO[]>(`${this.baseUrl}`);
  }

  // Metodo per salvare un nuovo timesheet
  save(timesheetData: TimeSheetDTO): Observable<TimeSheetDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<TimeSheetDTO>(`${this.baseUrl}`, timesheetData, { headers });
  }

  // Metodo per aggiornare un timesheet esistente
  updateTimesheet(timesheetData: TimeSheetDTO): Observable<TimeSheetDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<TimeSheetDTO>(`${this.baseUrl}/${timesheetData.id}`, timesheetData, { headers });
  }

  // Metodo per eliminare un timesheet
  deleteTimesheet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
*/








