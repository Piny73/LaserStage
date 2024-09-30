import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalBasicComponent } from '../layout/modal-basic/modal-basic.component';

@NgModule({
  declarations: [
    ModalBasicComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalBasicComponent
  ]
})
export class SharedModule { }

