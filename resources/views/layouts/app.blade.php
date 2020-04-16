<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title')</title>

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css">
    <!-- Google Fonts Roboto -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap">
    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="{{ asset('MDB/css/bootstrap.min.css')}}">
    <!-- Material Design Bootstrap -->
    <link rel="stylesheet" href="{{ asset('MDB/css/mdb.min.css')}}">
    <!-- custom Styles -->
    <link href="{{ asset('sass/style.scss') }}" rel="stylesheet">
</head>
<body>
    <main>
        @include('shared.navbar')
        @yield('content')
        @if (Auth::check())
            @include('shared.sidebar')
        @endif
    </main>
</body>
    <!-- jQuery -->
    <script type="text/javascript" src="{{ asset('MDB/js/jquery.min.js')}}"></script>
    <!-- Bootstrap tooltips -->
    <script type="text/javascript" src="{{ asset('MDB/js/popper.min.js')}}"></script>
    <!-- Bootstrap core JavaScript -->
    <script type="text/javascript" src="{{ asset('MDB/js/bootstrap.min.js')}}"></script>
    <!-- MDB core JavaScript -->
    <script type="text/javascript" src="{{ asset('MDB/js/mdb.min.js')}}"></script>
    <!-- custom scripts -->
    <script type="text/javascript" src="{{ asset('js/scripts.js')}}"></script>
</html>
