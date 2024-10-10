import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeSheetDTO } from '../models/timesheet.model';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private baseUrl = 'http://localhost:8080/exame/api/timesheets';

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



