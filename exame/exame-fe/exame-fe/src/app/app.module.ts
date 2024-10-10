import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeaturesModule } from './features/features.module'; 
import { LayoutModule } from './layout/layout.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TimesheetFormComponent } from './features/timesheet-list/timesheet-form/timesheet-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TimesheetFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    FeaturesModule, // Modulo con i componenti specifici dell'applicazione
    HttpClientModule, // Aggiunto HttpClientModule 
    NgbModalModule // Aggiungi NgbModalModule qui per abilitare i modali di ng-bootstrap
  ],
  providers: [
    provideHttpClient(withFetch()), // Abilita l'uso di fetch
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


