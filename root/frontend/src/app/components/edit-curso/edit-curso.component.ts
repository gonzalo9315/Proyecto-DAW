import { Component, OnInit, VERSION, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from '../../services/validators.service';
import Swal from 'sweetalert2';
import { CursosService } from '../../services/cursos.service';
import { CursoModel } from 'src/app/models/curso.model';

@Component({
  selector: 'app-edit-curso',
  templateUrl: './edit-curso.component.html',
  styleUrls: ['./edit-curso.component.css']
})
export class EditCursoComponent implements OnInit {

  public breakpoint: number; // Breakpoint observer code
  public addCusForm: FormGroup;
  wasFormChanged = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private cursoService: CursosService,
    private validators: ValidatorsService,
    public dialogRef: MatDialogRef<EditCursoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    this.addCusForm = this.fb.group({
      nombre: [ '', [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*'), Validators.minLength(4)] ],
    });

    this.cursoService.getCurso( this.data ).subscribe( resp => {

      this.addCusForm.controls['nombre'].setValue(resp.nombre);

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

  updateCurso() {

    this.markAsDirty(this.addCusForm);
    let dataCurso: CursoModel = this.addCusForm.value;
    dataCurso.id = this.data;

    this.cursoService.update( dataCurso ).subscribe( resp => {

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

  formChanged() {
    this.wasFormChanged = true;
  }

}
