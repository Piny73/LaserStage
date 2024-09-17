import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Employee } from '../../../../core/models/employee.model';
import { EmployeeService } from '../../../../core/services/employee.service';

@Component({
  selector: 'tr[app-employee-list-row]',
  templateUrl: './employee-list-row.component.html',
  styleUrl: './employee-list-row.component.css'
})
export class EmployeeListRowComponent {

  @Input('ep-data') ep!: Employee;
  @Input('ep-selected') epSelected!: Employee;
  @Output('onSelectEmployee') onSelectEmployee = new EventEmitter<Employee>();

  _selected: boolean = false;
  _copyEPSelected!: Employee;
  showDialog: boolean = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ep'] && this.ep) {
      this.initializeSelection();
    }
  }

  initializeSelection() {
    if (this.epSelected) {
      this._copyEPSelected = { ...this.epSelected };
      this._selected = this.ep.id === this.epSelected.id;  
    }
  }

  openChangeDialog(event: Event) {
    event.preventDefault();
    if (!this.ep) {
      console.warn('Attempted to open dialog before BP data is available');
      return;
    }
    console.log('Employee Selected Row:', this.ep);
    this.showDialog = true;
  }

  confirmChange(event: Event) {
    event.preventDefault();
    //console.log("Employee Selected: ", this.ep);
    this.showDialog = false; // Fechar o diálogo após a operação

    if (this.ep) {
        this._selected = true;
        this.onSelectEmployee.emit(this.ep);
    } else {
      console.warn('Area is not defined.');
    }

    this.showDialog = false;
  }
   

  cancelChange() {
    this.showDialog = false;
  }

}



