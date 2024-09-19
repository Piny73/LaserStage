import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeaturesModule } from '../features/features.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ModalBasicComponent } from './modal-basic/modal-basic.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    ModalBasicComponent
  ],
  imports: [
    CommonModule,
    FeaturesModule
  ],
  exports: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    ModalBasicComponent
  ]
})
export class LayoutModule { }






