<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Scripts -->
        <script src="{{ asset('js/app.js') }}" defer></script>

        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <link href="{{ asset('css/base.css') }}" rel="stylesheet">
    </head>
    <body>
        <div id="printed"></div>
        <div id="unprinted" class="app">
            <header class="app-header">
                <div class="app-logo">
                    {{ config('app.name', 'Laravel') }}
                </div>
                <div class="top-navs">
                    <ul class="nav top-nav-bar app-top-menu">
                        <li id="store_link" class="top-nav-item" >
                            <a class="header-tab ajax-nav" href="{{ route('StoreIndex', ['active_tab' => 'store']) }}">
                                Склад
                            </a>
                        </li>
                        <li id="cash_link" class="top-nav-item" >
                            <a class="header-tab ajax-nav" href="{{ route('CashIndex', ['active_tab' => 'warrant']) }}">
                                Финансы
                            </a>
                        </li>
                        <li id="employee_link" class="top-nav-item" >
                            <a class="header-tab ajax-nav" href="{{ route('EmployeeIndex') }}">
                                Сотрудники
                            </a>
                        </li>
                        <li id="partner_link" class="top-nav-item" >
                            <a class="header-tab ajax-nav" href="{{ route('PartnerIndex') }}">
                                Контрагенты
                            </a>
                        </li>
                        <li id="settings_link" class="top-nav-item" >
                            <a class="header-tab ajax-nav" href="{{ route('SettingsIndex', ['active_tab' => 'index']) }}">
                                Настройки
                            </a>
                        </li>
                        <li id="shedule_link" class="top-nav-item" >
                            <a class="header-tab ajax-nav" href="{{ route('ScheduleIndex') }}">
                                Планировщик
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
                                                <img src="http://autocrm/images/noavatar.png" alt="...">
                                            </span>
                                    {{ Auth::user()->name }}
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
                <div class="aside">
                    <ul class="nav">
                        <li>
                            <a href="#" class="ajax-nav update_url">
                                    <span class="nav-icon">
                                        <i class="fa fa-calendar"></i>
                                    </span>
                                <span class="nav-text">Календарь</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="ajax-nav update_url">
                                    <span class="nav-icon">
                                        <i class="fa fa-sign-in"></i>
                                    </span>
                                <span class="nav-text">Приход</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="ajax-nav update_url">
                                    <span class="nav-icon">
                                        <i class="fa fa-sign-out"></i>
                                    </span>
                                <span class="nav-text">Расход</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="ajax-nav update_url">
                                    <span class="nav-icon">
                                        <i class="fa fa-money"></i>
                                    </span>
                                <span class="nav-text">Продажа</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="ajax-nav update_url">
                                    <span class="nav-icon">
                                        <i class="fa fa-clipboard"></i>
                                    </span>
                                <span class="nav-text">Заказ</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="ajax-nav update_url">
                                    <span class="nav-icon">
                                        <i class="fa fa-phone"></i>
                                    </span>
                                <span class="nav-text">Звонки</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div id="ajax-content">
                    @yield('content')
                </div>
                <div id="dialogs"></div>
            </div>
        </div>
    <div class="preloader">
        <div class="porsh">
            <div class="i2-element"></div>
            <div class="i1-element"></div>
        </div>
        <div class="i3-element"></div>
    </div>
    </body>
</html>
