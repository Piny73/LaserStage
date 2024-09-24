import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent

  ],
  imports: [
    CommonModule,

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,

  ]
})
export class LayoutModule { }










