@extends('layouts/app')

@section('title', 'Crear Usuario')
@section('content')
<div class="container text-center">
    @if(Session::has("exito"))
        <div class="container">
            <div class="row text-center">
                <div class="alert alert-success alert-dismissible fade show">
                    <span>Usuario creado con exito</span>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        </div>
    @endif
    <h3 class="py-2">Información del usuario:</h3>
    <form action="{{ route('crearUsuario') }}" method="post">
    @csrf
        <div class="form-group">
            <label>Nombre de usuario</label>
            <input type="text" class="form-control @error('username') is-invalid @enderror" name="username" value="{{ old('username') }}" required autocomplete="username" autofocus>
        </div>
        <div class="form-group">
            <label>Contraseña</label>
            <input type="password" class="form-control @error('password') is-invalid @enderror" name="password"  required autocomplete="new-password">
        </div>
        <div class="form-group">
            <label>Confirmar contraseña</label>
            <input type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
        </div>
        <div class="form-group">
            <label>Nombre</label>
            <input type="text" class="form-control @error('nombre') is-invalid @enderror" value="{{ old('nombre') }}" name="nombre">
        </div>
        <div class="form-group">
            <label>Apellidos</label>
            <input type="text" class="form-control @error('apellidos') is-invalid @enderror" value="{{ old('apellidos') }}" name="apellidos">
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control @error('email') is-invalid @enderror" value="{{ old('email') }}" name="email">
        </div>
        <div class="form-group">
            <label>Tipo de usuario</label>
            <select class="form-control @error('tipo') is-invalid @enderror" name="tipo" value="{{ old('tipo') }}">
                <option>Elige el tipo de usuario</option>
                <option>alumno</option>
                <option>profesor</option>
            </select>
        </div>
        <button type="submit" class="btn btn-dark">Crear</button>
        <a class="btn btn-dark" href="{{ route('usuarios') }}">Volver</a>
    </form>
</div>
@endsection