import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ApiService } from './services/api.service';
import { AppuntamentoService } from './services/appuntamento.srvices';
import { UtilService } from './services/util.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule  // Importa HttpClientModule per i servizi HTTP
  ],
  providers: [
    AuthService,  // Servizio di autenticazione
    ApiService,   // Servizio API per le richieste HTTP
    UtilService,  // Servizio utilitario
    AppuntamentoService // Registra il servizio

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

