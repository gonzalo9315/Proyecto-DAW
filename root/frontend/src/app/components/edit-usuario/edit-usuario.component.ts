import { Component, OnInit, VERSION, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { ValidatorsService } from '../../services/validators.service';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent implements OnInit {

  public breakpoint: number; // Breakpoint observer code
  public addCusForm: FormGroup;
  wasFormChanged = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private usuarioService: UsuariosService,
    private validators: ValidatorsService,
    public dialogRef: MatDialogRef<EditUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {


    this.addCusForm = this.fb.group({
      username: [ '', [Validators.required, Validators.minLength(4)] ],
      email: [ '', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      nombre: [ '', [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*'), Validators.minLength(4)] ],
      apellidos: [ '', [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*'), Validators.minLength(4)] ],
      tipo: ['', [ Validators.required] ],
    });

    this.usuarioService.getUser(this.data).subscribe( resp => {

    this.addCusForm.controls['username'].setValue(resp.username);
    this.addCusForm.controls['email'].setValue(resp.email);
    this.addCusForm.controls['nombre'].setValue(resp.nombre);
    this.addCusForm.controls['apellidos'].setValue(resp.apellidos);
    this.addCusForm.controls['tipo'].setValue(resp.tipo);

    }, (err) => {

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.message
        });
    });

    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  public onAddCus(): void {
    this.markAsDirty(this.addCusForm);
  }

  closeDialog(): void {

    this.dialog.closeAll();
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

  updateUser() {

    this.markAsDirty(this.addCusForm);
    let dataUser: UsuarioModel = this.addCusForm.value;
    dataUser.id = this.data;

    this.usuarioService.update( dataUser ).subscribe( resp => {

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Usuario actualizado con exito!',
        showConfirmButton: false,
        timer: 1500
      });

      this.dialog.closeAll();

    }, (err) => {

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
}
