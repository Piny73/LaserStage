// src/app/layout/layout.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalBasicComponent } from './modal-basic/modal-basic.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    ModalBasicComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    ModalBasicComponent
  ]
})
export class LayoutModule { }
