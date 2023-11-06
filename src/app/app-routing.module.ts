import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlmacenComponent } from './componentes/almacen/almacen.component';
import { LoginComponent } from './componentes/login/login.component';
import { AdminComponent } from './componentes/admin/admin.component';


const routes: Routes = [
  {path: '',redirectTo:'login',pathMatch:'full'},
  {path: 'almacen',component:AlmacenComponent},
  {path: 'login',component:LoginComponent},
  {path: 'admin',component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
