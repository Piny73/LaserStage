import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeSheet } from '../../../core/models/timesheet.model';

@Component({
  selector: 'app-timesheet-row',
  templateUrl: './timesheet-row.component.html',
  styleUrl: './timesheet-row.component.css'
})
export class TimesheetRowComponent {

  @Input() timesheet!: TimeSheet;
  @Output() edit = new EventEmitter<number>();  // Per l'azione di modifica
  @Output() delete = new EventEmitter<number>(); // Per l'azione di eliminazione

  onEdit(): void {
    this.edit.emit(this.timesheet.id);
  }

  onDelete(): void {
    this.delete.emit(this.timesheet.id);
  }
}
