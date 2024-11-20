import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    LayoutModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
