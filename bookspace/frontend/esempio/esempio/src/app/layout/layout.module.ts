import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from '../login/login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[HeaderComponent,FooterComponent,LoginComponent]
})
export class LayoutModule { }