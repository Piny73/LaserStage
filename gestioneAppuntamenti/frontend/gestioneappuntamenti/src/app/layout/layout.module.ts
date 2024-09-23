import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalBasicComponent } from './modal-basic/modal-basic.component';
import { FeaturesModule } from '../features/features.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
   
  ],
  imports: [
    CommonModule,
    FeaturesModule,
    SharedModule 
   
  ],
  exports: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
  
  ]
})
export class LayoutModule { }









