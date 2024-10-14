import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  // change data ( / or -)
  formatDate(_date: string | null, toFrontendFormat: boolean): string | null {
    
    if (!_date || _date.trim() === '') {
      console.error("data null:", _date);
      return null;
    }

    let day: string, month: string, year: string;
    
    // check separator  (/ ou -)
    const separator = _date.includes('/') ? '/' : '-';
    const parts = _date.split(separator);
    
    // check format
    if (toFrontendFormat && parts.length === 3) {
      //backend dd/MM/yyyy
      [day, month, year] = parts;
      if ((day && month && year) && day.length < 3) {
        return `${year}-${month}-${day}`;
      } else {
        console.warn("format unkown:", _date);
        return _date;
      }
    } else if (!toFrontendFormat && parts.length === 3) {
      // frontend yyyy-MM-dd
      [year, month, day] = parts;
      if ((day && month && year) && year.length > 2) {
        return `${day}/${month}/${year}`;
      } else {
        console.warn("format unkown:", _date);
        return _date;
      }
    } else {
      console.error("Format invalid:", _date);
      return null;
    }
  }



}
