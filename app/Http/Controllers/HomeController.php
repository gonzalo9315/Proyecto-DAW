<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Curso;
use App\Models\Usuario;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function cursos(){
        
        $cursos = Curso::all();
        return view('direccion/cursos', ["cursos" => $cursos]);
    }

    public function crearCurso(Request $request){
        
        $curso = new Curso();
        $curso->nombre = $request->nombre;
        $curso->save();
        return back()->with(["exito"=> true]);
    }

    public function eliminarCurso($id){

        Curso::destroy($id);
        return back()->with(["exito"=> true]);
    }//Hacer con ajax

    public function usuarios(){

        $usuarios = Usuario::all();
        return view("direccion/usuarios", ["usuarios" => $usuarios]);
    }

    public function crearUsuario(Request $request){
        
        $usuario = new Usuario();
        $usuario->username = $request->username;
        $usuario->password = $request->password;
        $usuario->nombre = $request->nombre;
        $usuario->apellidos = $request->apellidos;
        $usuario->email = $request->email;
        $usuario->tipo = $request->tipo;
        $usuario->save();
        return back()->with(["exito"=> true]);
    }

    public function eliminarUsuario($id){

        Usuario::destroy($id);
        return back()->with(["exito"=> true]);
    }//Hacer con ajax
}
