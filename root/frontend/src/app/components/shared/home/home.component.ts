import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  rol: string;

  constructor( private router: Router) {

    this.rol = localStorage.getItem('rol');
  }

  ngOnInit(): void {

  }

  ir( ruta: string) {

    this.router.navigateByUrl(ruta);
  }
}
