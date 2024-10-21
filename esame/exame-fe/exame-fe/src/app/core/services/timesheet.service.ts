import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeSheetDTO } from '../models/timesheet.model';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private baseUrl = 'http://localhost:8080/exame/api/timesheet';

  constructor(private http: HttpClient) {}

  /**
   * Ottiene tutti i Timesheet.
   * @returns Un Observable che emette un array di TimeSheetDTO.
   */
  getTimesheets(): Observable<TimeSheetDTO[]> {
    return this.http.get<TimeSheetDTO[]>(this.baseUrl);
  }

  /**
   * Salva un nuovo Timesheet.
   * @param timesheetData I dati del Timesheet da salvare.
   * @returns Un Observable che emette il TimeSheetDTO creato.
   */
  save(timesheetData: TimeSheetDTO): Observable<TimeSheetDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<TimeSheetDTO>(this.baseUrl, timesheetData, { headers });
  }

  /**
   * Aggiorna un Timesheet esistente.
   * @param timesheetData I dati del Timesheet da aggiornare.
   * @returns Un Observable che emette il TimeSheetDTO aggiornato.
   */
  updateTimesheet(timesheetData: TimeSheetDTO): Observable<TimeSheetDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<TimeSheetDTO>(`${this.baseUrl}/${timesheetData.id}`, timesheetData, { headers });
  }

  /**
   * Elimina un Timesheet tramite ID.
   * @param id L'ID del Timesheet da eliminare.
   * @returns Un Observable che completa senza emettere valori.
   */
  deleteTimesheet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}




