import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component'; // Importa la HomeComponent

const routes: Routes = [
  { path: 'home', component: HomeComponent }, // Uso HomeComponent come dashboard


  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Reindirizza alla HomeComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


