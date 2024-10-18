import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeaturesModule } from './features/features.module'; // Modulo delle feature (contiene i componenti specifici come HomeComponent)
import { LayoutModule } from './layout/layout.module';

// IMPORTA NgbModalModule (da ng-bootstrap)
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,

    FeaturesModule,
    HttpClientModule,
    NgbModalModule

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


