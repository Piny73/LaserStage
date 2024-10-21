import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeaturesModule } from './features/features.module';
import { LayoutModule } from "./layout/layout.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    FeaturesModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModalModule
  ],
  providers: [
    provideHttpClient(withFetch()), // Abilita l'uso di fetch
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

