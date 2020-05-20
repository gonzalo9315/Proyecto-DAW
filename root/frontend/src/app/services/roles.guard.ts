import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {

  rolUser: string;
  rolGuard: string;

  constructor( protected router: Router ) {}

  canActivate(): boolean {

    this.rolUser = localStorage.getItem('rol');

    if ( this.rolUser === this.rolGuard ) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
