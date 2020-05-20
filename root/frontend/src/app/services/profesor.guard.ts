import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RolesGuard } from './roles.guard';

@Injectable({
  providedIn: 'root'
})
export class ProfesorGuard extends RolesGuard implements CanActivate {

  rolGuard = 'profesor';

  /*constructor( router: Router ) {
    super( router);
  }*/

  canActivate(): boolean {

    return super.canActivate();
  }
}
