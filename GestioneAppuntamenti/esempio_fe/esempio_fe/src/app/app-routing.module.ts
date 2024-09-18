import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppuntamentiComponent } from './features/appuntamenti/appuntamenti/appuntamenti.component';

import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';




const routes: Routes = [
  { path: 'appuntamenti', component: AppuntamentiComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  //{ path: '', redirectTo: '/appuntamenti', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  //{ path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


