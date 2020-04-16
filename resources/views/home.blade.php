@extends('layouts/app')

@section('title', 'Home')
@section('content')
<div class="container-fluid justify-content-center">
    <div class="container">
        <div class="row py-5">
            <div class="col-4">
                <!-- Card -->
                <div class="card card-image" style="background-image: url(https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2814%29.jpg);">

                    <!-- Content -->
                    <div class="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4">
                        <div>
                            <h5 class="pink-text"><i class="fas fa-chart-pie"></i> Dirección</h5>
                            <h3 class="card-title pt-2"><strong>Cursos</strong></h3>
                            <p>Ver cursos, editarlos y crearlos.</p>
                            <a class="btn btn-pink" href="{{ route('cursos') }}"><i class="fas fa-clone left"></i> Ir</a>
                        </div>
                    </div>

                </div>
                <!-- Card -->
            </div>
            <div class="col-4">
                <!-- Card -->
                <div class="card card-image" style="background-image: url(https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2814%29.jpg);">

                    <!-- Content -->
                    <div class="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4">
                        <div>
                            <h5 class="pink-text"><i class="fas fa-chart-pie"></i> Dirección</h5>
                            <h3 class="card-title pt-2"><strong>Usuarios</strong></h3>
                            <p>Ver usuarios, editarlos y crearlos.</p>
                            <a class="btn btn-pink" href="{{ route('usuarios') }}"><i class="fas fa-clone left"></i> Ir</a>
                        </div>
                    </div>

                </div>
                <!-- Card -->
            </div>
            <div class="col-4">
                <!-- Card -->
                <div class="card card-image" style="background-image: url(https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2814%29.jpg);">

                    <!-- Content -->
                    <div class="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4">
                        <div>
                            <h5 class="pink-text"><i class="fas fa-chart-pie"></i> Dirección</h5>
                            <h3 class="card-title pt-2"><strong>Cuenta</strong></h3>
                            <p>Ver datos de tu cuenta y actualizarlos.</p>
                            <a class="btn btn-pink" href=""><i class="fas fa-clone left"></i> Ir</a>
                        </div>
                    </div>

                </div>
                <!-- Card -->
            </div>
        </div>
    </div>
</div>
@endsection