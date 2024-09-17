import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppuntamentiFormComponent } from './features/appuntamenti/appuntamenti-form/appuntamenti-form.component';
import { AppuntamentiListComponent } from './features/appuntamenti/appuntamenti-list/appuntamenti-list.component';
import { LoginComponent } from './features/login/login.component';
import { LayoutModule } from "./layout/layout.module";
import { HomeComponent } from './features/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    AppuntamentiListComponent,
    AppuntamentiFormComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule
],
  providers: [
    // Aggiungi qui servizi se necessario
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
