import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  confirmPassword( pass1: string, pass2: string ) {

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.controls[pass1];
      const pass2Control = formGroup.controls[pass2];

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }

    };
  }
  confirmTipo( tipo: string ) {

    return ( formGroup: FormGroup ) => {

      const tipoControl = formGroup.controls[tipo];
      
      if ( tipoControl.value !== 'alumno' || tipoControl.value !== 'profesor' || tipoControl.value !== 'direccion') {
        tipoControl.setErrors({ noEsIgual: true });
      } else {
        tipoControl.setErrors(null);
      }
    }
  }
  /*existeUsuario( control: FormControl ): Promise<boolean> | Observable<boolean> {

    if( !control.value ) {
      return Promise.resolve(null);
    }

    return new Promise( (resolve, reject) => {

      setTimeout(() => {
        
        if ( control.value === 'strider' ) {
          resolve({ existe: true });
        } else {
          resolve( null );
        }

      }, 3500);


    });

  }*/

}
