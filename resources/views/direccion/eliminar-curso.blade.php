@extends('layouts/app')

@section('title', 'Crear Curso')
@section('content')
<div class="container text-center">
    @if(Session::has("exito"))
        <div class="container">
            <div class="row text-center">
                <div class="alert alert-success alert-dismissible fade show">
                    <span>Curso eliminado con exito</span>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        </div>
    @endif
    <h3 class="py-2">ELiminar curso:</h3>
    <form action="{{ route('eliminarCurso') }}" method="post" enctype="multipart/form-data">
    @csrf
    <div class="form-group">
        <select class="form-control @error('tipo') is-invalid @enderror" name="tipo" value="{{ old('tipo') }}">
            <option>Elige el curso</option>
            @foreach($cursos as $curso)
                <option>{{ $curso->nombre }}</option>
            @endforeach
        </select>
    </div>
        <button type="submit" class="btn btn-dark">Eliminar</button>
        <a class="btn btn-dark" href="{{ route('cursos') }}">Volver</a>
    </form>
</div>
@endsection