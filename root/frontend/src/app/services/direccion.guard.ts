import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RolesGuard } from './roles.guard';

@Injectable({
  providedIn: 'root'
})
export class DireccionGuard extends RolesGuard implements CanActivate {

  rolGuard = 'direccion';

  canActivate(): boolean {

    return super.canActivate();
  }
}
