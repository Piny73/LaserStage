import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  // Método atualizado para lidar com formatação de data (com / ou -)
  formatDate(_date: string | null, toFrontendFormat: boolean): string | null {
    
    if (!_date || _date.trim() === '') {
      console.error("data null:", _date);
      return null;  // Retorna null se a data for nula ou vazia
    }

    let day: string, month: string, year: string;
    
    // Detecta o separador de datas (/ ou -)
    const separator = _date.includes('/') ? '/' : '-';
    const parts = _date.split(separator);
    
    // Verifica se a data tem o formato correto e converte
    if (toFrontendFormat && parts.length === 3) {
      // Supondo que a data vinda do backend seja dd-MM-yyyy ou dd/MM/yyyy
      [day, month, year] = parts;
      if ((day && month && year) && day.length < 3) {
        return `${year}-${month}-${day}`;
      } else {
        console.warn("formato nao reconhecido:", _date);
        return _date;
      }
    } else if (!toFrontendFormat && parts.length === 3) {
      // Supondo que a data vinda do frontend seja yyyy-MM-dd
      [year, month, day] = parts;
      if ((day && month && year) && year.length > 2) {
        return `${day}/${month}/${year}`;
      } else {
        console.warn("formato nao reconhecido:", _date);
        return _date;
      }
    } else {
      console.error("Formato de data inválido:", _date);
      return null;
    }
  }

}
