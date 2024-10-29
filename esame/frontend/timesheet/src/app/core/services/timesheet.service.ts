import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeSheet, TimeSheetDTO } from '../models/timesheet.model';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private apiUrl = 'http://localhost:8080/esame/api/timesheet';

  constructor(private http: HttpClient) {}

  /**
   * Ottiene tutti i Timesheet.
   * @returns Un Observable che emette un array di TimeSheetDTO.
   */
  getTimeSheets(userId: number, page: number, size: number): Observable<TimeSheet[]> {
    return this.http.get<TimeSheet[]>(`${this.apiUrl}/${userId}?page=${page}&size=${size}`);
  }

  /**
   * Salva un nuovo Timesheet.
   * @param timesheetData I dati del Timesheet da salvare.
   * @returns Un Observable che emette il TimeSheetDTO creato.
   */
  save(timesheetData: TimeSheetDTO): Observable<TimeSheetDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<TimeSheetDTO>(this.apiUrl, timesheetData, { headers });
  }

  /**
   * Aggiorna un Timesheet esistente.
   * @param timesheetData I dati del Timesheet da aggiornare.
   * @returns Un Observable che emette il TimeSheetDTO aggiornato.
   */
  updateTimesheet(timesheetData: TimeSheetDTO): Observable<TimeSheetDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<TimeSheetDTO>(`${this.apiUrl}/${timesheetData.id}`, timesheetData, { headers });
  }

  /**
   * Elimina un Timesheet tramite ID.
   * @param id L'ID del Timesheet da eliminare.
   * @returns Un Observable che completa senza emettere valori.
   */
  deleteTimesheet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}




