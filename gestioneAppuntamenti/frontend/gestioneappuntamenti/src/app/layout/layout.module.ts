import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { AppuntamentiFormComponent } from '../features/appuntamenti/appuntamenti-form/appuntamenti-form.component';


@NgModule({
  declarations: [
    AppuntamentiFormComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule // Importa qui per il ngModel
  ],
  exports: [
    AppuntamentiFormComponent // Esporta se necessario
  ]
})
export class AppuntamentiModule { }












