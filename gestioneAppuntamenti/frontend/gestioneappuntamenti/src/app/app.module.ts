import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { CoreModule } from './core/core.module';
import { UserService } from './core/services/user.sevice';
import { FeaturesModule } from './features/features.module';
import { LayoutModule } from './layout/layout.module';
import { CreaAppuntamentoComponent } from './pages/crea-appuntamento/crea-appuntamento.component';
import { GestioneAppuntamentiComponent } from './pages/gestione-appuntamenti/gestione-appuntamenti.component';
import { DashboardComponent } from './pages/old-dashboard/dashboard.component';
import { StatisticheComponent } from './pages/statistiche/statistiche.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CreaAppuntamentoComponent,
    GestioneAppuntamentiComponent,
    StatisticheComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    LayoutModule,
    FeaturesModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    UserService // Aggiungi UserService qui
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }





