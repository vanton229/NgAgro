import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticaCli } from '@laranda/lib-ultra-net';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {

  constructor(
    private autenticaCli: AutenticaCli,
    private router: Router

  ) {
    this.autenticaCli.getUsuarioActivo();
   }

  canActivate(): boolean {

    if (this.autenticaCli.estaAutenticado()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
