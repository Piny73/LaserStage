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
    // Verifica se os dados do BusinessPlan foram alterados e se estão disponíveis
    if (changes['ep'] && this.ep) {
      this.initializeSelection();
    }
  }

  initializeSelection() {
    if (this.epSelected) {
      this._copyEPSelected = { ...this.epSelected };
      this._selected = this.ep.id === this.epSelected.id;
      
      if (this._selected){

        //console.log("selected bp row: ", this._copyBPSelected)
        this.onSelectEmployee.emit(this._copyEPSelected);

      }
    }
  }

  openChangeDialog(event: Event) {
    event.preventDefault();
    if (!this.ep) {
      console.warn('Attempted to open dialog before BP data is available');
      return;
    }
    console.log('Selected:', this.ep);
    this.showDialog = true;
  }

  confirmChange() {

    console.log("Employee Selected: ", this.employeeService.getSelectedEmployee());
    console.log("New Employee Selected: ", this.ep);
    if (this.ep && this.employeeService.getSelectedEmployee()) {
      if (this.employeeService.getSelectedEmployee().id !== this.ep.id) {
        this._copyEPSelected = { ...this.ep };
        this._selected = true;
        this.employeeService.setSelectedEmployee(this.ep);
        console.log('Employee Changed:', this.employeeService.getSelectedEmployee());
        this.onSelectEmployee.emit(this.ep);
      }
    } else {
      console.warn('Employee is not defined.');
    }
  
    this.showDialog = false; // Fechar o diálogo após a operação
  }
  
  

  cancelChange() {
    // Fechar o diálogo
    this.showDialog = false;
    if (this.employeeService.getSelectedEmployee() && this.ep) {
      this._selected = this.employeeService.getSelectedEmployee().id == this.ep.id;
    } else {
      console.warn('Employee is not defined.');
      this._selected = false;
    }
  }


}



