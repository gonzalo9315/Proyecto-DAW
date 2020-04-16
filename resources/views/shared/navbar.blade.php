<nav class="navbar navbar-expand-lg navbar-dark pink darken-4 example z-depth-2" style="z-index: 100;" >
    <a class="navbar-brand" href="{{ route('home') }}">IES La Marisma</a>
    <div class="collapse navbar-collapse">        
            @if (Route::has('login'))
                @auth
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href=""><strong>{{ Auth::user()->username}}</strong> ({{Auth::user()->tipo}})</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('logout') }}">Cerrar sesion</a>
                    </li>
                </ul>    
                @else
                <div class="container justify-content-center">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="">Aplicación para realizar exámenes de contabilidad</a>
                        </li>
                    </ul>
                </div>
                @endauth
            @endif        
    </div>
</nav>
