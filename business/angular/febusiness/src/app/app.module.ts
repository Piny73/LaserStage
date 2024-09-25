// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { FeaturesModule } from './features/features.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    FeaturesModule,
    AppRoutingModule
    ],
  providers: [
    provideHttpClient(withFetch()),
   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
   provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
