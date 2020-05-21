<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use Illuminate\Http\Request;

class CursoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index( Request $request )
    {
        $authUser = Auth()->user();

        if ( $authUser->tipo == 'direccion' ) {

            $cursos = Curso::all();
            return response()->json( $cursos );  

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
        $authUser = Auth('api')->user();

        if ( $authUser->tipo == 'direccion' ) {

            $request->validate([
                'nombre' => 'required|string|min:8',
            ]);
            $curso = new Curso([
                'nombre' => $request->nombre,
            ]);
            $curso->save();
            return response()->json([
                'message' => '¡Curso creado con exito!'
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

            $curso = Curso::where('id', $id)->first();
            return response()->json($curso);
        } else {

            return response()->json([
                'message' => '¡Tu usuario no tiene los permisos necesarios!'
            ], 201);
        }

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    /*public function edit($id)
    {
        //
    }*/

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
            ]);
            $curso = Curso::find($request->id);
            $curso->nombre = $request->nombre;
            $curso->save();
            return response()->json([
                'message' => 'Curso actualizado con exito!'
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

        if ( $authUser->tipo == 'direccion' ) {

            Curso::destroy($id);
            return response()->json([
                'message' => '¡Curso eliminado con exito!'
            ], 201);
        } else {

            return response()->json([
                'message' => '¡Tu usuario no tiene los permisos necesarios!'
            ], 201);
        } 
    }
}
