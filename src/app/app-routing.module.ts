import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlmacenComponent } from './componentes/almacen/almacen.component';
import { LoginComponent } from './componentes/login/login.component';


const routes: Routes = [
  {path: '',redirectTo:'login',pathMatch:'full'},
  {path: 'almacen',component:AlmacenComponent},
  {path: 'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
