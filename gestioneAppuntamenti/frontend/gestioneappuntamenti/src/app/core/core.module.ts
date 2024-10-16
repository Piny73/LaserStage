import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthService } from './auth/auth.service';


import { ApiService } from './api.service';
import { AppuntamentoService } from './services/appuntamento.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule  // Importa HttpClientModule per le richieste HTTP
  ],
  providers: [
    AuthService,  // Servizio di autenticazione
    ApiService,   // Servizio API per le richieste HTTP
    
    AppuntamentoService // Servizio per la gestione degli appuntamenti
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule è già stato caricato. Importalo solo nel AppModule.'
      );
    }
  }
}


