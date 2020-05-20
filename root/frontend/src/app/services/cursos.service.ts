import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CursoModel } from '../models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private url = 'http://127.0.0.1:8000/api/auth';
  userToken: string;

  constructor( private http: HttpClient ) {

    this.userToken = localStorage.getItem('token');
  }

  register( data: CursoModel[]) {

    return this.http.post(`${ this.url }/cursos/create`, data).pipe( map( (resp: any) => resp ));
  }

  update( data: CursoModel ){

    return this.http.post(`${ this.url }/curso/update`, data).pipe( map( (resp: any) => resp ));
  }

  getCurso( id: number ) {

    const headers = new HttpHeaders({

      responseType: 'application/json',
      Authorization: `Bearer ${this.userToken}`,
    });

    return this.http.get(`${ this.url }/curso/${id}`, { headers } ).pipe( map( (resp: any) => resp));
  }

  getAll() {


    const headers = new HttpHeaders({

      responseType: 'application/json',
      Authorization: `Bearer ${this.userToken}`,
    });


    return this.http.get(`${ this.url }/cursos`, { headers } ).pipe( map( (resp: any) => resp));
  }

  delete( id: number ){

    const headers = new HttpHeaders({

      responseType: 'application/json',
      Authorization: `Bearer ${this.userToken}`,
    });

    return this.http.get(`${ this.url }/curso/delete/${id}`, { headers } ).pipe( map( (resp: any) => resp ));

  }
}
