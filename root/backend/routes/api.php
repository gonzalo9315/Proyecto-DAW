<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');

    // Usuario
    Route::post('usuario/update', 'UsuarioController@update');  
    Route::post('usuario/create', 'UsuarioController@create');  

    // Curso
    Route::post('cursos/create', 'CursoController@create'); 
    Route::post('curso/update', 'CursoController@update'); 

    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');

        // Usuario
        Route::get('usuarios', 'UsuarioController@index');  
        Route::get('usuario/{id}', 'UsuarioController@show');
        Route::get('usuario/delete/{id}', 'UsuarioController@destroy');  
        
        // Curso
        Route::get('cursos', 'CursoController@index');  
        Route::get('curso/{id}', 'CursoController@show');
        Route::get('curso/delete/{id}', 'CursoController@destroy'); 

        //Route::resource('usuarios', 'UsuarioController');
        //Route::resource('cursos', 'CursoController');
    });
});
