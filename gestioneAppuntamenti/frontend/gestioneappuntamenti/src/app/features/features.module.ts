import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { GestioneUtenteComponent } from './gestione-utente/gestione-utente.component'; // Aggiunto SharedModule
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreaModificaUtenteComponent } from './crea-modifica-utente/crea-modifica-utente.component';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    GestioneUtenteComponent,
    CreaModificaUtenteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule,  // Importato SharedModule per ModalBasicComponent
    FormsModule
  ],
  exports: [
    LoginComponent,
    HomeComponent,
    GestioneUtenteComponent
  ]
})
export class FeaturesModule { }





