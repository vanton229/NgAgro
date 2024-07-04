import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { PrincipalComponent } from './core/components/principal/principal.component';
import { UsuarioGuard } from './guards/usuario.guard';
import { Error404Component } from './core/components/error404/error404.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: PrincipalComponent, canActivate: [UsuarioGuard] },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
