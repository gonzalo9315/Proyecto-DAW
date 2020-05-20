import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  @Output() login: EventEmitter<boolean>;
  errorSubmit = false;

  constructor( private auth: AuthService, private fb: FormBuilder, private validators: ValidatorsService ) {

    this.login = new EventEmitter();
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  register() {

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    let data = this.forma.value;

    this.auth.register( data ). subscribe( resp => {

      Swal.close();
      Swal.fire(
        resp.message,
        'Inicia sesion para continuar',
        'success'
      );

      this.cambiarForm();

    }, (err) => {

      this.errorSubmit = true;

      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: 'Rellena los campos correctamente'
      });
    });

  }

crearFormulario() {

    this.forma = this.fb.group({
      username: ['', [ Validators.required, Validators.minLength(4)]  ],
      password: ['', [Validators.required, Validators.minLength(8)] ],
      password_confirmation: ['', [Validators.required] ],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      nombre: ['', [Validators.required, Validators.minLength(4)] ],
      apellidos: ['', [Validators.required, Validators.minLength(4)] ],
    }, {
      validators: this.validators.confirmPassword('password', 'password_confirmation')
    });
  }

  cambiarForm() {

    this.login.emit( false );
  }

  invalid( campo: string): boolean {

    return this.forma.get(campo).invalid && this.forma.get(campo).touched;
  }

  onSubmit( campo: string ) {

    return this.errorSubmit && this.forma.get(campo).invalid;
  }
}
