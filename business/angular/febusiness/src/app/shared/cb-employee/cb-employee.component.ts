import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Employee } from '../../core/models/employee.model';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
  selector: 'app-cb-employee',
  templateUrl: './cb-employee.component.html',
  styleUrl: './cb-employee.component.css'
})
export class CbEmployeeComponent {

  @Input("selectedEmployee") selectedItem : number | null = null;
  @Output() selectedItemChange: EventEmitter<number> = new EventEmitter<number>();         
  employeeList: Employee[] = [];   

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
      this.employeeList = this.employeeService.getEmployeeList();
      this.updateSelected()
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("onChange CB Employee");
    //console.log("onChange CB 1", changes);
    /*const _up_cur = changes['isUpdate']?.currentValue ? changes['isUpdate']?.currentValue : 0;
    const _up_pre = changes['isUpdate']?.previousValue ? changes['isUpdate']?.previousValue : 0;

    const _s_cv = changes['selectedItem']?.currentValue ? changes['selectedItem']?.currentValue : -1;
    const _s_pv = changes['selectedItem']?.previousValue ? changes['selectedItem']?.previousValue : -1;

    // Verifica se os objetos não são nulos/undefined
    if (changes['selectedItem'].currentValue) {
      //console.log("onChange CB 2", changes);
      this.updateSelected();
    }*/
  }

  onSelected(event: any) {
    const selectedId = event.target.value;
    this.selectedItem = this.employeeList.find(employee => employee.id === parseInt(selectedId, 10))?.id|| 0;
    this.selectedItemChange.emit(this.selectedItem);
  }

  updateSelected(): void {
    if(this.selectedItem) {
      const selectedEmployee = this.employeeList.find(employee => employee.id == this.selectedItem);
      //console.log("onUpdateSelectArea: ", selectedArea);
      if (selectedEmployee) {
        //console.log("onChange CB 4", selectedArea);
        this.selectedItem = selectedEmployee.id!;
      }
    }
    else{
      //console.log("onChange CB 5");
      this.selectedItem = -1;
    }
  }

}
