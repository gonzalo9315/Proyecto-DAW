@extends('layouts/app')

@section('title', 'Usuarios')
@section('content')
<div class="container text-center">
    <h3 class="py-2">Usuarios:</h3>
    <table class="table table-bordered">
        <thead class="thead-dark">
            <tr>
                <th style="width:40px;" scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellidos</th>
                <th scope="col">Email</th>
            </tr>
        </thead>
        <tbody>
            @foreach($usuarios as $index => $usuario)
            <tr>
                <th scope="row">{{ $index+1 }}</th>
                <td>{{ $usuario->username }}</td>
                <td>{{ $usuario->nombre }}</td>
                <td>{{ $usuario->apellidos }}</td>
                <td>{{ $usuario->email }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    <div class="py-2">
        <a class="btn btn-dark" href="{{ route('crearUsuario') }}">Crear Usuario</a>
        <a class="btn btn-dark" href="{{ route('home') }}">Volver</a>
    </div>
</div>
@endsection