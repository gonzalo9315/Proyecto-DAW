<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'HomeController@index')->name('home');

//----- Curso -----//
Route::get('/cursos', 'HomeController@cursos')->name('cursos');

Route::get('/crear_curso', function(){
    return view("direccion/crear-curso");
})->name('crearCurso');

Route::post('/crear_curso', 'HomeController@crearCurso')->name('crearCurso');

Route::get('/eliminar_curso', function(){
    return view("direccion/eliminar-curso");
})->name('eliminarCurso');

Route::post('/eliminar_curso', 'HomeController@eliminarCurso')->name('eliminarCurso');

//----- Usuario -----//
Route::get('/usuarios', 'HomeController@usuarios')->name('usuarios');

Route::get('/crear_usuario', function(){
    return view("direccion/crear-usuario");
})->name('crearUsuario');

Route::post('/crear_usuario', 'HomeController@crearUsuario')->name('crearUsuario');

Route::get('/eliminar_usuario', 'HomeController@cargarUsuarios')->name('eliminarUsuario');

Route::post('/eliminar_usuario', 'HomeController@eliminarUsuario')->name('eliminarUsuario');

//----- Auth -----//
Route::get('/logout', 'Auth\LoginController@logout')->name('logout');

Auth::routes();

