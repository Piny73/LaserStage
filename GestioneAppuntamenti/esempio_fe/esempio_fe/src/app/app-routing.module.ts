import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoteGuardService } from './core/rote-guard.service';
import { AppuntamentiComponent } from './features/appuntamenti/appuntamenti/appuntamenti.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';


const routes: Routes = [
  { path: 'appuntamenti', component: AppuntamentiComponent, canActivate: [RoteGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [RoteGuardService] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




