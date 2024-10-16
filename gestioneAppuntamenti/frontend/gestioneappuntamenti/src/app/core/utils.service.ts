import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  // Metodo aggiornato per gestire la formattazione delle date (con / o -)
  formatDate(_date: string | null, toFrontendFormat: boolean): string | null {
    
    // Controlla se la data è nulla o vuota
    if (!_date || _date.trim() === '') {
      console.error("Data nulla:", _date);
      return null;  // Restituisce null se la data è nulla o vuota
    }

    let day: string, month: string, year: string;
    
    // Rileva il separatore della data (/ o -)
    const separator = _date.includes('/') ? '/' : '-';
    const parts = _date.split(separator);
    
    // Verifica se la data ha il formato corretto e converte
    if (toFrontendFormat && parts.length === 3) {
      // Supponendo che la data venga dal backend nel formato dd-MM-yyyy o dd/MM/yyyy
      [day, month, year] = parts;
      // Verifica che il giorno, mese e anno siano validi
      if ((day && month && year) && day.length < 3) {
        return `${year}-${month}-${day}`; // Restituisce la data nel formato yyyy-MM-dd
      } else {
        console.warn("Formato non riconosciuto:", _date);
        return _date; // Restituisce la data originale se il formato non è riconosciuto
      }
    } else if (!toFrontendFormat && parts.length === 3) {
      // Supponendo che la data venga dal frontend nel formato yyyy-MM-dd
      [year, month, day] = parts;
      // Verifica che il giorno, mese e anno siano validi
      if ((day && month && year) && year.length > 2) {
        return `${day}/${month}/${year}`; // Restituisce la data nel formato dd/MM/yyyy
      } else {
        console.warn("Formato non riconosciuto:", _date);
        return _date; // Restituisce la data originale se il formato non è riconosciuto
      }
    } else {
      console.error("Formato di data non valido:", _date);
      return null; // Restituisce null se il formato della data è invalido
    }
  }
}
