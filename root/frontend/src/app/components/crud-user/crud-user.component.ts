import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddUsuarioComponent } from '../add-usuario/add-usuario.component';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuarioModel } from '../../models/usuario.model';
import { EditUsuarioComponent } from '../edit-usuario/edit-usuario.component';

@Component({
  selector: 'app-crud-user',
  templateUrl: './crud-user.component.html',
  styleUrls: ['./crud-user.component.css']
})
export class CrudUserComponent implements OnInit {

  displayedColumns: string[] = ['id', 'username', 'email', 'nombre', 'apellidos', 'tipo'];
  dataSource: MatTableDataSource<UsuarioModel>;
  selection = new SelectionModel<UsuarioModel>(false, []);
  itemId: number = null;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor( private router: Router, private service: UsuariosService, public dialog: MatDialog ){

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

    const dialogRef = this.dialog.open( AddUsuarioComponent, {
      width: '640px', disableClose: true
    });
    dialogRef.afterClosed().subscribe( (resp: any) => {

      this.select(this.itemId);
      this.read();
    });
  }

  update(): void {

    const dialogRef = this.dialog.open( EditUsuarioComponent, {
      data: this.itemId, width: '640px', disableClose: true, 
    });
    dialogRef.afterClosed().subscribe( (resp: any) => {

      this.select(this.itemId);
      this.read();
    });
  }

  delete() {

    Swal.fire({
      title: `¿Seguro que quieres eliminar al usuario con id: ${this.itemId}?`,
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
          'Usuario eliminado con exito',
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
  }
}


