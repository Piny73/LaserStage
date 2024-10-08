import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeaturesModule } from '../features/features.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavBarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    FeaturesModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavBarComponent
  ]
})
export class LayoutModule { }




