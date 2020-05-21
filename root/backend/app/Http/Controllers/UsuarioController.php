<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $token = $request->bearerToken();
        $authUser = Auth()->user();

        if ( $authUser->tipo == 'direccion' ) {

            $users = User::all();
            return response()->json($users);  
        
        } else {

            return response()->json([
                'message' => '¡Tu usuario no tiene los permisos necesarios!'
            ], 201);
        }

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create( Request $request )
    {

        $authUser = auth('api')->user();
        // return response()->json($authUser); 
         
        if ( $authUser->tipo == 'direccion' ) {

            $request->validate([
                'username' => 'required|string|unique:users|min:4',
                'password' => 'required|string|confirmed|min:8',
                'email' => 'required|string|email|unique:users',
                'nombre' => 'required|string|min:4',
                'apellidos' => 'required|string|min:4'
            ]);
            $user = new User([
                'username' => $request->username,
                'password' => Hash::make($request->password),
                'email' => $request->email,
                'nombre' => $request->nombre,
                'apellidos' => $request->apellidos,
                'tipo' => $request->tipo
            ]);
            $user->save();
            return response()->json([
                'message' => 'Nuevo usuario registrado con exito!'
            ], 201);
        } else {

            return response()->json([
                'message' => '¡Tu usuario no tiene los permisos necesarios!'
            ], 201);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show( $id )
    {
        $authUser = Auth()->user();

        if ( $authUser->tipo == 'direccion' ) {

            $user = User::where('id', $id)->first();
            return response()->json($user);
        } else {

            return response()->json([
                'message' => '¡Tu usuario no tiene los permisos necesarios!'
            ], 201);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update( Request $request )
    {
        $authUser = Auth('api')->user();

        if ( $authUser->tipo == 'direccion' ) {

            $request->validate([
                'nombre' => 'required|string|min:4',
                'apellidos' => 'required|string|min:4',
                'tipo' => 'required|string|min:4',
                'email' => 'required|string|email',
                'username' => 'required|string|min:4'
            ]);
            $user = User::find($request->id);
            $user->username = $request->username;
            $user->email = $request->email;
            $user->nombre = $request->nombre;
            $user->apellidos = $request->apellidos;
            $user->tipo = $request->tipo;
            $user->save();
            return response()->json([
                'message' => '¡Usuario actualizado con exito!'
            ], 201);
        } else {

            return response()->json([
                'message' => '¡Tu usuario no tiene los permisos necesarios!'
            ], 201);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy( $id )
    {
        $authUser = Auth()->user();
        
        if ( $authUser->tipo === 'direccion' ) {

            User::destroy($id);
            return response()->json([
                'message' => 'Usuario eliminado con exito!'
            ], 201);
        }else {

            return response()->json([
                'message' => '¡Tu usuario no tiene los permisos necesarios!'
            ], 201);
        }
    }
}
