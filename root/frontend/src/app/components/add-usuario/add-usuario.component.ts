import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { ValidatorsService } from '../../services/validators.service';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit {

  public breakpoint: number; // Breakpoint observer code
  public addCusForm: FormGroup;
  wasFormChanged = false;
  errorSubmit: boolean;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private usuarioService: UsuariosService,
    private validators: ValidatorsService,
    private dialogRef: MatDialogRef<AddUsuarioComponent>
  ) { }

  public ngOnInit(): void {

    this.addCusForm = this.fb.group({
      username: [ '', [Validators.required, Validators.minLength(4)] ],
      password: ['', [Validators.required, Validators.minLength(8)] ],
      password_confirmation: ['', [Validators.required] ],
      email: [ '', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      nombre: [ '', [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*'), Validators.minLength(4)] ],
      apellidos: [ '', [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*'), Validators.minLength(4)] ],
      tipo: ['', [ Validators.required] ],
    }, {
      validators: [ this.validators.confirmPassword('password', 'password_confirmation') ]
    });

    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  public onAddCus(): void {
    this.markAsDirty(this.addCusForm);
  }

  closeDialog(): void {

    // this.dialog.closeAll();
    this.dialogRef.close('rrrr');
  }

  // tslint:disable-next-line:no-any
  public onResize(event: any): void {

    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  private markAsDirty(group: FormGroup): void {

    group.markAsDirty();
    // tslint:disable-next-line:forin
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }

  formChanged() {
    this.wasFormChanged = true;
  }

  createUser(){

    this.markAsDirty(this.addCusForm);
    const data: UsuarioModel[] = this.addCusForm.value;
    console.log(data);
    console.log( this.addCusForm);
    this.usuarioService.register( data ).subscribe( resp => {

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario creado con exito',
        showConfirmButton: false,
        timer: 1500
      });

      this.errorSubmit = false;
      this.addCusForm.reset();

    }, (err) => {

      this.errorSubmit = true;

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message
      });

    });
  }

  invalid( input: string ): boolean {

    return this.addCusForm.get(input).invalid && this.addCusForm.get(input).touched;
  }

  onSubmit( input: string ): boolean {

    return this.errorSubmit && this.addCusForm.get(input).invalid;
  }
}
