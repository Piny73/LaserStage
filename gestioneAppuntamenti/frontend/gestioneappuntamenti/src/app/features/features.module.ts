import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';
import { AppuntamentiComponent } from './appuntamenti/appuntamenti/appuntamenti.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppuntamentiComponent,
    HomeComponent,
    LoginComponent // Aggiungi i componenti necessari qui
  ],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FeaturesModule { }







