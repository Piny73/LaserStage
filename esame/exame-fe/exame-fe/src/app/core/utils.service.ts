import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  // Metodo per formattare la data nel formato ISO 8601 'yyyy-MM-ddTHH:mm:ss.SSS' per inviare al backend
  formatDateForBackend(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // I mesi partono da 0 in JavaScript
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    // Ritorna la data nel formato ISO 8601 completo di tempo
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  // Metodo per formattare la data per il frontend (da yyyy-MM-dd a dd/MM/yyyy) e viceversa
  formatDate(_date: string | null, toFrontendFormat: boolean): string | null {
    if (!_date || _date.trim() === '') {
      console.error("Data null o vuota:", _date);
      return null;
    }

    let day: string, month: string, year: string;
    const separator = _date.includes('/') ? '/' : '-';
    const parts = _date.split(separator);

    // Converti il formato a seconda del valore di toFrontendFormat
    if (toFrontendFormat && parts.length === 3) {
      [day, month, year] = parts;
      if (day.length < 3) {
        return `${year}-${month}-${day}`;
      }
    } else if (!toFrontendFormat && parts.length === 3) {
      [year, month, day] = parts;
      if (year.length > 2) {
        return `${day}/${month}/${year}`;
      }
    }

    console.error("Formato non valido:", _date);
    return null;
  }

  // Metodo per formattare l'ora nel formato 'HH:mm:ss.SSS'
  formatTime(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    // Ritorna l'ora nel formato 'HH:mm:ss.SSS'
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  // Metodo per formattare data e ora insieme (ISO 8601)
  formatDateTime(date: Date): string {
    return this.formatDateForBackend(date); // Riutilizza formatDateForBackend che gestisce già tutto
  }

}


