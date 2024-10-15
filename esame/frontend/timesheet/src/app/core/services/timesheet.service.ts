import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { TimeSheetDTO } from '../models/timesheet.model';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private baseUrl = 'http://localhost:8080/esame/api/timesheets';

  constructor(private http: HttpClient) {}

  // Metodo per ottenere tutti i timesheet
  getTimesheets(): Observable<TimeSheetDTO[]> {
    return this.http.get<TimeSheetDTO[]>(`${this.baseUrl}`).pipe(
      catchError(error => {
        console.error('Error fetching timesheets:', error);
        return of([]); // Restituisce un array vuoto in caso di errore
      })
    );
  }

  // Metodo per salvare un nuovo timesheet
  save(timesheetData: TimeSheetDTO): Observable<TimeSheetDTO | null> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<TimeSheetDTO>(`${this.baseUrl}`, timesheetData, { headers }).pipe(
      catchError(error => {
        console.error('Error saving timesheet:', error);
        return of(null); // Restituisce null in caso di errore
      })
    );
  }

  // Metodo per aggiornare un timesheet esistente
  updateTimesheet(timesheetData: TimeSheetDTO): Observable<TimeSheetDTO | null> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<TimeSheetDTO>(`${this.baseUrl}/${timesheetData.id}`, timesheetData, { headers }).pipe(
      catchError(error => {
        console.error('Error updating timesheet:', error);
        return of(null); // Restituisce null in caso di errore
      })
    );
  }

  // Metodo per eliminare un timesheet
  deleteTimesheet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting timesheet:', error);
        return of(); // Gestisci l'errore, puoi restituire null o undefined se necessario
      })
    );
  }
}






