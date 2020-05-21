import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = 'http://127.0.0.1:8000/api/auth';
  userToken: string;

  constructor( private http: HttpClient ) {

    this.userToken = localStorage.getItem('token');
  }

  register( data ) {

    const headers = new HttpHeaders({

      responseType: 'application/json',
      Authorization: `Bearer ${this.userToken}`,
    });

    return this.http.post(`${ this.url }/usuario/create`, data, { headers }).pipe( map( (resp: any) => resp ));
  }

  update( data ){

    const headers = new HttpHeaders({

      responseType: 'application/json',
      Authorization: `Bearer ${this.userToken}`,
    });

    return this.http.post(`${ this.url }/usuario/update`, data, { headers }).pipe( map( (resp: any) => resp ));
  }

  getUser( id: number ) {

    const headers = new HttpHeaders({

      responseType: 'application/json',
      Authorization: `Bearer ${this.userToken}`,
    });

    return this.http.get(`${ this.url }/usuario/${id}`, { headers } ).pipe( map( (resp: any) => resp ));
  }

  getAll() {


    const headers = new HttpHeaders({

      responseType: 'application/json',
      Authorization: `Bearer ${this.userToken}`,
    });


    return this.http.get(`${ this.url }/usuarios`, { headers } ).pipe( map( (resp: any) => resp ));
  }

  delete( id: number ){

    const headers = new HttpHeaders({

      responseType: 'application/json',
      Authorization: `Bearer ${this.userToken}`,
    });

    return this.http.get(`${ this.url }/usuario/delete/${id}`, { headers } ).pipe( map( (resp: any) => resp ));

  }
}
