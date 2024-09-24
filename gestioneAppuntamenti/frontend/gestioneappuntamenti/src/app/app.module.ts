import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { CoreModule } from './core/core.module';
import { UserService } from './core/services/user.sevice';
import { AppuntamentiFormComponent } from './features/appuntamenti/appuntamenti-form/appuntamenti-form.component';
import { FeaturesModule } from './features/features.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    AppuntamentiFormComponent,
    FeaturesModule

  ],
  imports: [
    BrowserModule,
    CoreModule,
    LayoutModule,
    FeaturesModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgModule,
    RouterModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }





