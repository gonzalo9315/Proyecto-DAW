import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost/Proyecto-DAW/root/backend/public/api/auth';
  userToken: string;
  // rol: string;

  constructor(private http: HttpClient) {

    this.leerToken();
  }

  register( data: string[]) {

    return this.http.post(`${ this.url }/signup`, data).pipe( map( (resp: any) => { // this.guardarToken(resp);
                                                                                    return resp;
                                                                                  }));
  }

  login(username: string, password: string) {

    const authData = {
      username: username,
      password: password
    };

    return this.http.post(`${ this.url }/login`, authData).pipe( map( (resp: any) => { localStorage.setItem('rol', resp.rol);
                                                                                       this.guardarToken(resp);
                                                                                       return resp;
                                                                                      }));
  }

  logout() {

    localStorage.removeItem('rol');
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
  }

  /*getUsuarios(): Observable<any[]>{

    return this.http.get(`${ this.url }/usuario`).pipe(map( (resp: any[]) => resp.map( usuario => ({ nombre: usuario.nombre}) )));
  }*/

  private guardarToken( idToken: any ) {

    this.userToken = idToken.access_token;
    localStorage.setItem('token', this.userToken);

    let expires = idToken.expires_at;
    localStorage.setItem( 'expires', expires );
  }

  leerToken() {

    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(): boolean {// Proteger token.

    if ( this.userToken.length < 2 ) {
      return false;
    }

    const expires = new Date(localStorage.getItem('expires'));

    if ( expires > new Date() ) {
        return true;
    } else {
      return false;
    }
  }

}
