<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Scripts -->
        <script src="{{ mix('js/classic.js') }}" defer></script>

        <!-- Styles -->
        <link href="{{ mix('css/classic.css') }}" rel="stylesheet">
    </head>
    <body>
        <div class="app">
            <header class="app-header">
                <div class="app-logo">
                    {{ config('app.name', 'Laravel') }}
                </div>
                <div class="top-navs">
                    <ul class="top-nav-bar app-top-menu">
                        <li class="top-nav-item" >
                            <a class="header-tab" href="">
                                Склад
                            </a>
                        </li>
                        <li class="top-nav-item" >
                            <a class="header-tab" href="">
                                Финансы
                            </a>
                        </li>
                        <li class="top-nav-item" >
                            <a class="header-tab" href="">
                                Финансы
                            </a>
                        </li>
                        <li class="top-nav-item" >
                            <a class="header-tab" href="">
                                Финансы
                            </a>
                        </li>
                        <li class="top-nav-item" >
                            <a class="header-tab" href="">
                                Финансы
                            </a>
                        </li>
                        <li class="top-nav-item" >
                            <a class="header-tab" href="">
                                Финансы
                            </a>
                        </li>
                    </ul>
                    <span class="md-auto"></span>
                    <ul class="top-nav-bar right-nav">
                        <li class="top-nav-item top-warnings active">
                            <a class="d-flex align-items-center p-10" href="">
                                <i class="fa fa-bell" aria-hidden="true"></i>
                                <span class="badge-pill"></span>
                            </a>
                        </li>
                        @guest
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                            </li>
                            @if (Route::has('register'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                                </li>
                            @endif
                        @else
                            <li class="top-nav-item">
                                <a class="d-flex align-items-center p-10" href="">
                                    <span class="avatar w-32 mr-3">
                                        <img src="{{ asset('images/noavatar.png') }}" alt="...">
                                    </span>
                                    {{ Auth::user()->partner->fio }}
                                </a>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                         document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </header>
            <div id="app" class="app-content">
                @yield('content')
            </div>
        </div>
    </body>
</html>
