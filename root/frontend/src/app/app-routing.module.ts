import { NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve } from '@angular/router';

// Components
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/shared/home/home.component';
import { AccountComponent } from './components/account/account.component';
import { CrudUserComponent } from './components/crud-user/crud-user.component';
import { CrudCursoComponent } from './components/crud-curso/crud-curso.component';

// Guards
// import { RolesGuard } from './services/roles.guard';
import { AuthGuard } from './services/auth.guard';
import { GuestGuard } from './services/guest.guard';
import { AlumnoGuard } from './services/alumno.guard';
import { ProfesorGuard } from './services/profesor.guard';
import { DireccionGuard } from './services/direccion.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'cuenta', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: CrudUserComponent, canActivate: [AuthGuard, DireccionGuard] },
  { path: 'cursos', component: CrudCursoComponent, canActivate: [AuthGuard, DireccionGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
