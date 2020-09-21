<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Scripts -->
        <script src="{{ mix('js/app.js') }}" defer></script>

        <script>
            window.socket_host = '{{ env('SOCKET_HOST') }}';
            window.socket_port = '{{ env('SOCKET_PORT') }}';
            window.store_id = '{{ Auth::user()->current_store }}';
        </script>

        <!-- Styles -->
        <link href="{{ mix('css/app.css') }}" rel="stylesheet">
        <link href="{{ mix('css/base.css') }}" rel="stylesheet">
        <link href="{{ mix('css/fonts.css') }}" rel="stylesheet">
    </head>
    <body>

    <input type="hidden" name="barcode_temp" id="barcode_temp">
        <div id="printed"></div>
        <div id="preloader"></div>
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
                        @can('СуперАдмин')
                        <li id="actions_link" class="top-nav-item" >
                            <a class="header-tab ajax-nav" href="{{ route('AdminDashboard') }}">
                                Панель управления
                            </a>
                        </li>
                        @else
                        @canany(['Смотреть заявки поставщикам','Смотреть поступления','Смотреть продажи','Смотреть заказ клиента','Смотреть корректировки'])
                        <li id="store_link" class="top-nav-item" >
                            <a class="header-tab ajax-nav" href="{{ route('StoreIndex', 'store') }}">
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
                        @canany(['Смотреть контакты'])
                        <li id="partner_link" class="top-nav-item" >
                            <a class="header-tab ajax-nav" href="{{ route('PartnerIndex') }}">
                                Контакты
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
                        @canany(['Смотреть статистику'])
                        <li id="statistic_link" class="top-nav-item" >
                            <a class="header-tab ajax-nav" href="{{ route('StatisticIndex') }}">
                                Статистика
                            </a>
                        </li>
                        @endcanany
{{--                        @canany(['Смотреть статистику'])--}}
                            <li id="shop_link" class="top-nav-item" >
                                <a class="header-tab ajax-nav" href="{{ route('ShopIndex') }}">
                                    Интернет-магазин
                                </a>
                            </li>
{{--                        @endcanany--}}
                        @endcan
                    </ul>
                    <span class="md-auto  mr-auto"><span id="shop_name"></span></span>
                    {{--{{ Auth::user()->current_store }}--}}
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
                                    <div id="stack_item_container">
                                        <a class="stack_item">Ytn</a>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li class="top-nav-item" onclick="systemMessages.modal.show()">
                            <a id="bell_badge" class="ico_link bell">
                                <span id="stack_bell_count" class="badge-pill"></span>
                            </a>
                        </li>
                        <li class="top-nav-item dropdown pointer" onclick="window.helper.openModal(this, event)">
                            <div class="d-flex align-items-center">
                                <div class="w-52 p-10">
                                    <div class="avatar w-32 mr-3">
                                        <img class="user_thumb" src="{{ Auth::user()->partner->getPicUrl() }}" alt="...">
                                    </div>
                                </div>
                                <div class="pr-10">
                                    <div style="line-height: 14px;">{{ Auth::user()->name }}</div>
                                    <div style="font-size: 12px;font-weight: bold;line-height: 14px;">{{ Auth::user()->roles->first()->name }}</div>
                                </div>
                            </div>

                            <div class="dropdown_container">
                                <div class="arrow"></div>

                                <a class="element ajax-nav" href="{{ route('UserIndex') }}">Личный кабинет</a>
                                <a class="element ajax-nav" href="{{ route('UserIndex', ['active_tab' => 'service']) }}">Мои услуги</a>

                                @canany(['Смотреть настройки'])
                                    <a class="element ajax-nav" href="{{ route('SettingsIndex', ['active_tab' => 'index']) }}" onclick="window.helper.closeModal(this, event)">
                                        Настройки
                                    </a>
                                @endcanany

                                @if(auth()->user()->partner->category_id == 7)
                                    <a class="element ajax-nav" href="{{ route('UserIndex', ['active_tab' => 'vehicles']) }}">Гараж</a>
                                @endif

                                @if(session()->has('auth_from_id'))
                                    <a class="element" href="{{ route('backToUser') }}">
                                        Вернуться в адм. панель
                                    </a>
                                @endif

                                <a class="element" onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                                    Выход
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </header>
            <div id="app" class="app-content">
                <div class="aside">
                    <ul class="nav">
                        @can('СуперАдмин')
                            <li><span class="admin_letter">А</span></li>
                            <li><span class="admin_letter">Д</span></li>
                            <li><span class="admin_letter">М</span></li>
                            <li><span class="admin_letter">И</span></li>
                            <li><span class="admin_letter">Н</span></li>
                            <li><span class="admin_letter">И</span></li>
                            <li><span class="admin_letter">С</span></li>
                            <li><span class="admin_letter">Т</span></li>
                            <li><span class="admin_letter">Р</span></li>
                            <li><span class="admin_letter">А</span></li>
                            <li><span class="admin_letter">Т</span></li>
                            <li><span class="admin_letter">О</span></li>
                            <li><span class="admin_letter">Р</span></li>
                        @else
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
                        <div class="version">version <br>{{ env('VERSION', '0.0.0') }} - {{ Auth::user()->current_store }}</div>
                    </div>
                </div>
                <div id="ajax-content">
                    @yield('content')
                </div>
                <div id="dialogs"></div>
                @include(get_template() . '.system.aside_messages')
                @include(get_template() . '.system.system_dialog')
                @include(get_template() . '.system.croppr_dialog')
                @if(!Auth::user()->company->set_master_complite)
                    @include(get_template() . '.system.settings_master')
                @endif
                @include(get_template(). '.system.settings_provider_dialog')
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
