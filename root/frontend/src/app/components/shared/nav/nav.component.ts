import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  rol: string;
  // opened = true;
  
  constructor( private breakpointObserver: BreakpointObserver, private auth: AuthService, private router: Router ) {

    if (localStorage.getItem('rol')){
      this.rol = localStorage.getItem('rol');
    } else {
      this.rol = null;
    }
  }

  ngOnInit() {

  }

  readRol() {

    this.rol = localStorage.getItem('rol'); 
  }

  salir() {

    this.auth.logout();
    this.rol = null;
    this.router.navigateByUrl('/login');
  }
}
