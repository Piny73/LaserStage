import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CbAreaComponent } from './cb-area/cb-area.component';
import { CbEmployeeComponent } from './cb-employee/cb-employee.component';



@NgModule({
  declarations: [
    CbAreaComponent,
    CbEmployeeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CbAreaComponent, CbEmployeeComponent]
})
export class SharedModule { }
