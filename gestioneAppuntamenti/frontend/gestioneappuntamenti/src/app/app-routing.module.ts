import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

import { AppuntamentiComponent } from './features/appuntamenti/appuntamenti/appuntamenti.component';
import { ClientiComponent } from './features/clienti/clienti.component';
import { LoginComponent } from './features/login/login.component';
import { VettureComponent } from './features/vetture/vetture.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'appuntamenti', component: AppuntamentiComponent },
  { path: 'clienti', component: ClientiComponent },
  { path: 'vetture', component: VettureComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect alla home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}




