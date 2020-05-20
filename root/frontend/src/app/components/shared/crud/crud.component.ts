import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidatorsService } from '../../../services/validators.service';
import { AuthService } from '../../../services/auth.service';
import { CursosService } from '../../../services/cursos.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  data: any[]; // Response service
  keys: any[]; // Keys response
  private service: any;
  place: string; // path url
  forma: FormGroup;
  errorSubmit = false;
  itemId: number;

  constructor( private http: HttpClient,
               private router: Router,
               private route: ActivatedRoute,
               private fb: FormBuilder,
               private validators: ValidatorsService,
               private auth: AuthService ) {

    this.route.data.subscribe( data => this.place = data.place );

    switch ( this.place ){
      case 'usuarios': this.service = new UsuariosService( http );
                       break;
      case 'cursos': this.service = new CursosService( http );
                     break;
    }
    this.read();
    this.createFormAdd();
    //this.createFormEdit();
  }

  ngOnInit(): void {

  }

  read(){

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.service.getAll().subscribe( (resp: any[]) => {

      Swal.close();
      this.data = resp;
      this.keys = Object.keys(this.data[0]);
      this.keys.splice(0, 1);
      // console.log(this.data);
      // console.log(this.keys);
      
    }, (err) => {

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message
      });

      this.router.navigateByUrl('home');
    });
  }

  create(){


    const data = this.forma.value;
    // console.log(data);

    this.service.register( data ).subscribe( resp => {

      Swal.close();

      const prom = new Promise((resolve) => {

        setTimeout( () => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Nuevo registro creado con exito',
            showConfirmButton: false,
            timer: 1500
          });
        }, 500);
        resolve('ok');
      });

      this.errorSubmit = false;
      this.forma.reset();
      prom.then( resp => this.read());

    }, (err) => {

      this.errorSubmit = true;

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message
      });

      // this.router.navigateByUrl('home');
    });
  }

  update( id: number){


  }

  delete(){

  }

  createFormAdd() {

    if ( this.place === 'usuarios' ){

        this.forma = this.fb.group({
        id: [''],
        username: ['', [ Validators.required, Validators.minLength(4)]  ],
        password: ['', [Validators.required, Validators.minLength(8)] ],
        password_confirmation: ['', [Validators.required] ],
        email: ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]  ],
        nombre: ['', [Validators.required, Validators.minLength(4)] ],
        apellidos: ['', [ Validators.required, Validators.minLength(4)]  ],
        tipo: ['', [ Validators.required]  ],
        // baja: ['', [ Validators.required, Validators.pattern("^[0-1]*$"), Validators.minLength(1) ]  ],
      }, {
        validators: [this.validators.confirmPassword('password', 'password_confirmation'),
                     this.validators.confirmTipo('tipo')]
      });
    } else{

        this.forma = this.fb.group({
          id: [''],
          nombre: ['', [ Validators.required, Validators.minLength(8)]  ],
        });
    }
  }

  createFormEdit( data: any ) {

    if ( this.place === 'usuarios' ){

        this.forma = this.fb.group({
        username: [ data.username, [ Validators.required, Validators.minLength(4)]  ],
        email: [ data.email, [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]  ],
        nombre: [ data.nombre, [Validators.required, Validators.minLength(4)] ],
        apellido: [ data.apellido, [ Validators.required, Validators.minLength(4)]  ],
        tipo: [ data.tipo, [ Validators.required], this.validators.confirmTipo  ],
        // baja: ['', [ Validators.required, Validators.pattern("^[0-1]*$"), Validators.minLength(1) ]  ],
      }/*, {
        validators: [this.validators.confirmPassword('password', 'password_confirmation'),
                     this.validators.confirmTipo('tipo')]
      }*/);
    } else{
        this.forma = this.fb.group({
          id: [''],
          nombre: ['', [ Validators.required, Validators.minLength(8)]  ],
        });
    }
}

  select( id: number) {

    this.itemId = id;
    console.log(this.itemId);
  }

  invalid( input: string): boolean {

    return this.forma.get(input).invalid && this.forma.get(input).touched;
  }

  onSubmit( input: string ): boolean {

    return this.errorSubmit && this.forma.get(input).invalid;
  }

  hasError( input: string, error: string): boolean {

    return this.forma.get(input).hasError(error);
  }

}
