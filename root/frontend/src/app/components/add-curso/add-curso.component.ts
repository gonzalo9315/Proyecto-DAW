import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';
import Swal from 'sweetalert2';
import { CursosService } from '../../services/cursos.service';
import { CursoModel } from '../../models/curso.model';

@Component({
  selector: 'app-add-curso',
  templateUrl: './add-curso.component.html',
  styleUrls: ['./add-curso.component.css']
})
export class AddCursoComponent implements OnInit {

  public breakpoint: number; // Breakpoint observer code
  public addCusForm: FormGroup;
  wasFormChanged = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private cursoService: CursosService,
    private validators: ValidatorsService,
    private dialogRef: MatDialogRef<AddCursoComponent>
  ) { }

  ngOnInit(): void {

    this.addCusForm = this.fb.group({
      nombre: [ '', [Validators.required, Validators.minLength(8)] ],
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

  createCurso(){

    this.markAsDirty(this.addCusForm);
    const data: CursoModel[] = this.addCusForm.value;

    this.cursoService.register( data ).subscribe( resp => {

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario creado con exito',
        showConfirmButton: false,
        timer: 1500
      });
      this.addCusForm.reset();

    }, (err) => {

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message
      });
    });
  }
}
