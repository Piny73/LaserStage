import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppuntamentiFormComponent } from './features/appuntamenti/appuntamenti-form/appuntamenti-form.component';
import { HomeComponent } from './features/home/home.component'; // Importa la HomeComponent

const routes: Routes = [

  { path: '', component: HomeComponent }, // Uso HomeComponent come dashboard
  { path: 'appuntamento', component: AppuntamentiFormComponent }, // Uso HomeComponent come dashboard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


