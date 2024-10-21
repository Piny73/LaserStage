import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CbActivityComponent } from './cb-activity/cb-activity.component';
import { CbUserComponent } from './cb-user/cb-user.component';



@NgModule({
  declarations: [
    CbActivityComponent,
    CbUserComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CbActivityComponent,
    CbUserComponent]
})
export class SharedModule { }
