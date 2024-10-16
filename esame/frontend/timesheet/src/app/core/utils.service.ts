import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  // Metodo per formattare le date nel formato ISO 8601 'yyyy-MM-ddTHH:mm:ss.SSS' prima di inviare al backend
  formatDateForBackend(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // I mesi partono da 0 in JavaScript
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    // Ritorna la data nel formato ISO 8601
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  // Funzione per formattare le date (frontend o backend)
  formatDate(_date: string | null, toFrontendFormat: boolean): string | null {
    if (!_date || _date.trim() === '') {
      console.error("Data null o vuota:", _date);
      return null;
    }

    let day: string, month: string, year: string;

    const separator = _date.includes('/') ? '/' : '-';
    const parts = _date.split(separator);

    // Converti dal formato backend (dd/MM/yyyy) al formato frontend (yyyy-MM-dd)
    if (toFrontendFormat && parts.length === 3) {
      [day, month, year] = parts;
      if ((day && month && year) && day.length < 3) {
        return `${year}-${month}-${day}`;
      } else {
        console.warn("Formato sconosciuto:", _date);
        return _date;
      }
    } else if (!toFrontendFormat && parts.length === 3) {
      [year, month, day] = parts;
      if ((day && month && year) && year.length > 2) {
        return `${day}/${month}/${year}`;
      } else {
        console.warn("Formato sconosciuto:", _date);
        return _date;
      }
    } else {
      console.error("Formato non valido:", _date);
      return null;
    }
  }
}
