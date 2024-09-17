import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Area } from '../../../../core/models/area.model';
import { AreaService } from '../../../../core/services/area.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { Employee } from '../../../../core/models/employee.model';

@Component({
  selector: 'tr[app-area-list-row]',
  templateUrl: './area-list-row.component.html',
  styleUrl: './area-list-row.component.css'
})
export class AreaListRowComponent implements OnInit{
  @Input('area-data') area!: Area;
  @Input('area-selected') areaSelected!: Area;
  @Output('onSelectArea') onSelectArea = new EventEmitter<Area>();

  _selected: boolean = false;
  _copyAreaSelected!: Area;
  showDialog: boolean = false;

  constructor(private areaService: AreaService, private employeeService : EmployeeService) {
  }

  ngOnInit(): void {
    if(this.area && this.area.responsibleid){
      this.area.responsible = this.employeeService.findById(this.area.responsibleid) as Employee;
    }
    //console.log("Area row: ", this.area);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['area'] && this.area) {
      this.initializeSelection();
    }
  }

  initializeSelection() {
    if (this.areaSelected) {
      this._copyAreaSelected = { ...this.areaSelected };
      this._selected = this.area.id === this.areaSelected.id;
      
    }
  }

  openChangeDialog(event: Event) {
    event.preventDefault();
    if (!this.area) {
      console.warn('Attempted to open dialog before Area data is available');
      return;
    }
    //console.log('Selected:', this.area);
    this.showDialog = true;
  }

  confirmChange() {

    if (this.area) {
        this._selected = true;
        //console.log("Area row emit: ", this.area);
        this.onSelectArea.emit(this.area);
    } else {
      console.warn('Area is not defined.');
    }
  
    this.showDialog = false;
  }
  
}



  