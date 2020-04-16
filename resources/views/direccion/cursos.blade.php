@extends('layouts/app')

@section('title', 'Cursos')
@section('content')
<div class="container text-center">
    <h3 class="py-2">Cursos:</h3>
    <table class="table table-bordered">
        <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th class="w-75" scope="col">Nombre del curso</th>
                <th scope="col">Opciones</th>
            </tr>
        </thead>
        <tbody>
            @foreach($cursos as $index => $curso)
            <tr>
                <th scope="row">{{ $index+1 }}</th>
                <td>{{ $curso->nombre }}</td>
                <td><button class="btn btn-danger"><i class="fas fa-trash-alt"></i>  Eliminar</button></td>
            </tr>
            @endforeach
        </tbody>
    </table>
    <div class="py-2">
        <a class="btn btn-dark" href="{{ route('crearCurso') }}">Crear Curso</a>
        <a class="btn btn-dark" href="{{ route('home') }}">Volver</a>
    </div>
</div>
@endsection