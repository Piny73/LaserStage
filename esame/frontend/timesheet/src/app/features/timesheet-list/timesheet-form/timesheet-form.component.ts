import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeSheet } from '../../../core/models/timesheet.model';

@Component({
  selector: 'app-timesheet-form',
  templateUrl: './timesheet-form.component.html',
  styleUrl: './timesheet-form.component.css'
})
export class TimesheetFormComponent {

  @Input() timesheet: TimeSheet | null = null; // timesheet da modificare o null per uno nuovo
  @Output() save = new EventEmitter<TimeSheet>();
  timesheetForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.timesheetForm = this.fb.group({
      activityid: ['', Validators.required],
      userid: ['', Validators.required],
      detail: ['', Validators.required],
      dtstart: [null, Validators.required],
      dtend: [null, Validators.required]
    });
  }

  ngOnChanges(): void {
    if (this.timesheet) {
      this.timesheetForm.patchValue(this.timesheet);
    }
  }

  onSubmit(): void {
    if (this.timesheetForm.valid) {
      this.save.emit(this.timesheetForm.value);
    }
  }
}
