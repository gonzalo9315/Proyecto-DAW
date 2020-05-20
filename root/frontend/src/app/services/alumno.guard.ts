import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RolesGuard } from './roles.guard';

@Injectable({
  providedIn: 'root'
})
export class AlumnoGuard extends RolesGuard implements CanActivate {

  rolGuard = 'alumno';

  canActivate(): boolean {

    return super.canActivate();
  }
}
