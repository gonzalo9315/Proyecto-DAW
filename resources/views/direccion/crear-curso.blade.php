@extends('layouts/app')

@section('title', 'Crear Curso')
@section('content')
<div class="container text-center">
    @if(Session::has("exito"))
        <div class="container">
            <div class="row text-center">
                <div class="alert alert-success alert-dismissible fade show">
                    <span>Curso creado con exito</span>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        </div>
    @endif
    <h3 class="py-2">Información del curso:</h3>
    <form action="{{ route('crearCurso') }}" method="post" enctype="multipart/form-data">
    @csrf
        <div class="form-group">
            <label>Nombre</label>
            <input type="text" class="form-control" name="nombre">
        </div>
        <button type="submit" class="btn btn-dark">Crear</button>
        <a class="btn btn-dark" href="{{ route('cursos') }}">Volver</a>
    </form>
</div>
@endsection