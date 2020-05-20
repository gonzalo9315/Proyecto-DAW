import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forma: FormGroup;
  register = false;
  errorSubmit = false;

  constructor( private auth: AuthService, private fb: FormBuilder, private router: Router ) {

    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  login() {

    const username = this.forma.get('username').value;
    const password = this.forma.get('password').value;

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.login(username, password).subscribe( resp => {


      this.router.navigateByUrl('/home');
      Swal.close();
    }, (err) => {

      this.errorSubmit = true;
      let texto = 'El usuario introducido no existe';

      if ( !this.forma.valid ) {
        texto = 'Rellene todos los campos';
      }

      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: texto
      });
    });

  }

  crearFormulario() {

    this.forma = this.fb.group({
      username: ['', [ Validators.required]  ],
      password: ['', [Validators.required] ],
    });
  }

  cambiarForm() {

    this.forma.reset();
    this.register = true;
    this.errorSubmit = false;
  }

  invalid( campo: string) {

    return this.forma.get(campo).invalid && this.forma.get(campo).touched;
  }

  onSubmit() {

    return this.errorSubmit;
  }
}
