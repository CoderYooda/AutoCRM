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
        <link href="{{ asset('css/fonts.css') }}" rel="stylesheet">
    </head>
    <body>
        <div id="printed"></div>
        <div id="unprinted" class="app">
            <header class="app-header">
                <div class="app-logo">
                    {{ config('app.name', 'Laravel') }}
                    <svg class="preloader" version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
                    <circle fill="#fff" stroke="none" cx="6" cy="50" r="6"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1"/></circle>
                        <circle fill="#fff" stroke="none" cx="26" cy="50" r="6"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2"/></circle>
                        <circle fill="#fff" stroke="none" cx="46" cy="50" r="6"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3"/></circle>
                </svg>
                </div>
                <div class="top-navs">
                    <ul class="nav top-nav-bar app-top-menu">

                        @canany(['Смотреть товары','Смотреть заявки поставщикам','Смотреть поступления','Смотреть продажи','Смотреть заказ клиента','Смотреть корректировки'])
                        <li id="store_link" class="top-nav-item" >
                            <a class="header-tab ajax-nav" href="{{ route('StoreIndex', \App\Http\Controllers\StoreController::getAllowedPage()) }}">
                                Склад
                            </a>
                        </li>
                        @endcanany
                        @canany(['Смотреть денежные операции','Смотреть денежные перемещения'])
                        <li id="cash_link" class="top-nav-item" >
                            <a class="header-tab ajax-nav" href="{{ route('CashIndex', \App\Http\Controllers\CashController::getAllowedPage()) }}">
                                Финансы
                            </a>
                        </li>
                        @endcanany
                        {{--<li id="employee_link" class="top-nav-item" >--}}
                            {{--<a class="header-tab ajax-nav" href="{{ route('EmployeeIndex') }}">--}}
                                {{--Сотрудники--}}
                            {{--</a>--}}
                        {{--</li>--}}
                        @canany(['Смотреть контакты'])
                        <li id="partner_link" class="top-nav-item" >
                            <a class="header-tab ajax-nav" href="{{ route('PartnerIndex') }}">
                                Контакты
                            </a>
                        </li>
                        @endcanany
                        @canany(['Смотреть настройки'])
                        <li id="settings_link" class="top-nav-item" >
                            <a class="header-tab ajax-nav" href="{{ route('SettingsIndex', ['active_tab' => 'index']) }}">
                                Настройки
                            </a>
                        </li>
                        @endcanany
                        @canany(['Смотреть планировщик'])
                        <li id="sсhedule_link" class="top-nav-item" >
                            <a class="header-tab ajax-nav" href="{{ route('ScheduleIndex') }}">
                                Планировщик
                            </a>
                        </li>
                        @endcanany
                        @canany(['Смотреть историю'])
                        <li id="actions_link" class="top-nav-item" >
                            <a class="header-tab ajax-nav" href="{{ route('ActionsIndex') }}">
                                История
                            </a>
                        </li>
                        @endcanany
                        <li id="actions_link" class="top-nav-item" >
                            <a class="header-tab ajax-nav" href="{{ route('StatisticIndex') }}">
                                Статистика
                            </a>
                        </li>
                    </ul>
                    <span class="md-auto  mr-auto"><span id="shop_name">{{ Auth::user()->company()->first()->name }}</span></span>
                    <div id="current_time">
                        <div class="h">00</div>
                        <div class="m">00</div>
                        <div class="s">00</div>
                    </div>
                    <ul class="top-nav-bar right-nav">

                        <li class="top-nav-item dropdown pointer" onclick="window.helper.openModal(this, event)">
                            <a id="stack_badge" class="ico_link stack">
                                <span id="stack_badge_count" class="badge-pill"></span>
                            </a>
                            <div id="stack_dropdown" class="dropdown_container">
                                <div class="arrow"></div>
                                <div class="mess_container" data-simplebar style="max-height: 220px; width: 200px">
                                    <div id="stack_item_container"></div>
                                </div>
                            </div>
                        </li>

                        <li class="top-nav-item">
                            <a id="bell_badge" class="ico_link bell" data-toggle="modal" data-target="#notifications" data-toggle-class="modal-open-aside">
                                <span id="stack_bell_count" class="badge-pill"></span>
                            </a>
                        </li>
                        <li class="top-nav-item dropdown pointer" onclick="window.helper.openModal(this, event)">
                            <span class="d-flex align-items-center p-10" href="">
                                            <span class="avatar w-32 mr-3">
                                                <img class="user_thumb" src="{{ Auth::user()->partner->getPicUrl() }}" alt="...">
                                            </span>
                                {{ Auth::user()->name }}
                            </span>

                            <div class="dropdown_container">
                                <div class="arrow"></div>
                                <a class="element ajax-nav" href="{{ route('UserIndex') }}">
                                    Личный кабинет
                                </a>
                                <a class="element ajax-nav" href="{{ route('UserIndex', ['id' => $request['id'], 'active_tab' => 'service']) }}"> Мои услуги</a>
                                <a class="element" onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                                    Выход
                                </a>
                            </div>
                        </li>
                        {{--<li class="top-nav-item dropdown pointer" onclick="window.helper.openModal(this, event)">--}}
                            {{--<span class="d-flex align-items-center p-10" href="">--}}
                                 {{--<span class="avatar w-32 mr-3">--}}
                                    {{--<img src="http://autocrm/images/noavatar.png" alt="...">--}}
                                 {{--</span>--}}
                                 {{--{{ Auth::user()->company()->first()->name }}--}}
                            {{--</span>--}}

                            {{--<div class="dropdown_container">--}}
                                {{--<div class="arrow"></div>--}}
                                {{--<a class="element" href="#" onclick="">--}}
                                    {{--Личный кабинет--}}
                                {{--</a>--}}
                                {{--<a class="element" onclick="event.preventDefault();document.getElementById('logout-form').submit();">--}}
                                    {{--Выход--}}
                                {{--</a>--}}
                            {{--</div>--}}
                        {{--</li>--}}
                        @can('СуперАдмин')
                        <li class="top-nav-item dropdown pointer" onclick="window.helper.openModal(this, event)">
                            <span class="d-flex align-items-center p-10" href="">
                                <span class="avatar w-32 mr-3">
                                    <img src="http://autocrm/images/noavatar.png" alt="...">
                                </span>
                                Админ
                            </span>

                            <div class="dropdown_container">
                                <div class="arrow"></div>
                                {!! \App\Http\Controllers\UserController::getAllUsersList() !!}
                            </div>
                        </li>
                        @endcan
                    </ul>
                </div>
            </header>
            <div id="app" class="app-content">
                <div class="aside">
                    <ul class="nav">
                        @can('Смотреть планировщик')
                        <li>
                            <a href="{{ route('ScheduleIndex') }}" class="ajax-nav update_url">
                                    <span class="nav-icon">
                                        <i class="fa fa-calendar"></i>
                                    </span>
                                <span class="nav-text">Календарь</span>
                            </a>
                        </li>
                        @endcan
                        @can('Создавать денежные операции')
                        <li>
                            <a onclick="openDialog('warrantDialog', '&isIncoming=1')" class="ajax-nav update_url">
                                    <span class="nav-icon">
                                        <i class="fa fa-sign-in"></i>
                                    </span>
                                <span class="nav-text">Приход</span>
                            </a>
                        </li>
                        <li>
                            <a onclick="openDialog('warrantDialog', '&isIncoming=0')" class="ajax-nav update_url">
                                    <span class="nav-icon">
                                        <i class="fa fa-sign-out"></i>
                                    </span>
                                <span class="nav-text">Расход</span>
                            </a>
                        </li>
                        @endcan
                        @can('Создавать продажи')
                        <li>
                            <a onclick="openDialog('shipmentDialog')" class="ajax-nav update_url">
                                    <span class="nav-icon">
                                        <i class="fa fa-money"></i>
                                    </span>
                                <span class="nav-text">Продажа</span>
                            </a>
                        </li>
                        @endcan
                        @can('Создавать заказ клиента')
                        <li>
                            <a onclick="openDialog('clientorderDialog')" class="ajax-nav update_url">
                                    <span class="nav-icon">
                                        <i class="fa fa-clipboard"></i>
                                    </span>
                                <span class="nav-text">Заказ</span>
                            </a>
                        </li>
                        @endcan
                        {{--<li>--}}
                            {{--<a href="#" class="ajax-nav update_url">--}}
                                    {{--<span class="nav-icon">--}}
                                        {{--<i class="fa fa-phone"></i>--}}
                                    {{--</span>--}}
                                {{--<span class="nav-text">Звонки</span>--}}
                            {{--</a>--}}
                        {{--</li>--}}
                    </ul>
                    <div class="mt-auto">
                        <ul class="nav">
                            <li>
                                <a onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                                <span class="nav-icon">
                                    <i class="fa fa-power-off"></i>
                                </span>
                                    <span class="nav-text">Выход</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="ajax-content">
                    @yield('content')
                </div>
                <div id="dialogs"></div>
                @include(env('DEFAULT_THEME', 'classic') . '.system.aside_messages')
                @include(env('DEFAULT_THEME', 'classic') . '.system.system_dialog')
                @include(env('DEFAULT_THEME', 'classic') . '.system.croppr_dialog')
            </div>

        </div>
        <div id="square_select" class=""></div>
        {{--<div class="preloader">--}}
            {{--<div class="porsh">--}}
                {{--<div class="i2-element"></div>--}}
                {{--<div class="i1-element"></div>--}}
            {{--</div>--}}
            {{--<div class="i3-element"></div>--}}
        {{--</div>--}}
        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
            @csrf
        </form>
        <div id="login-form" class="hide"></div>
    </body>

</html>
