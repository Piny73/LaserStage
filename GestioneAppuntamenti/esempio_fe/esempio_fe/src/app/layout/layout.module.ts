import { NgModule } from '@angular/core';
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
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavBarComponent
  ]
})
export class LayoutModule { }

