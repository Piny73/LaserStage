import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from '../login/login.component'; // Assicurati del percorso corretto
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent // Aggiungi LoginComponent alle dichiarazioni
  ],
  imports: [
    CommonModule,
    FormsModule// Aggiungi FormsModule se usi NgModel nel LoginComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class LayoutModule { }



