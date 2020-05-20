import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CursosService } from '../../services/cursos.service';
import { CursoModel } from '../../models/curso.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddCursoComponent } from '../add-curso/add-curso.component';
import { EditCursoComponent } from '../edit-curso/edit-curso.component';

@Component({
  selector: 'app-crud-curso',
  templateUrl: './crud-curso.component.html',
  styleUrls: ['./crud-curso.component.css']
})
export class CrudCursoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre'];
  dataSource: MatTableDataSource<CursoModel>;
  selection = new SelectionModel<CursoModel>(false, []);
  itemId: number = null;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor( private router: Router, private service: CursosService, public dialog: MatDialog ){

    this.read();
  }

  ngOnInit() {

  }

  read() {

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.service.getAll().subscribe( resp => {

      if ( resp.message ) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: resp.message
        });
        this.router.navigateByUrl('login');
        return;
      }

      Swal.close();
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    }, (err) => {

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message
      });
    });
  }

  create(): void {

    const dialogRef = this.dialog.open(AddCursoComponent, {
      width: '640px', disableClose: true
    });
    dialogRef.afterClosed().subscribe( (resp: any) => {

      this.select(this.itemId);
      this.read();
    });
  }

  update(): void {

    const dialogRef = this.dialog.open( EditCursoComponent, {
      data: this.itemId, width: '640px', disableClose: true,
    });
    dialogRef.afterClosed().subscribe( (resp: any) => {

      this.select(this.itemId);
      this.read();
    });
  }

  delete() {

    Swal.fire({
      title: `¿Seguro que quieres eliminar el curso con id: ${this.itemId}?`,
      text: '¡No podras revertirlo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.service.delete( this.itemId ).subscribe();
        this.read();
        Swal.fire(
          '¡Eliminado!',
          'Curso eliminado con exito',
          'success'
        );
      }
    });
  }

  select( id: number) {

    if ( this.itemId == null || this.itemId !== id) {
      this.itemId = id;
    } else {
      this.itemId = null;
    }

    // console.log(this.itemId);
  }
}
