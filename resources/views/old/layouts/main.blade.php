<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8" />
    <title>@yield('title')</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="AutoCrm" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimal-ui" />
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/template.css') }}" rel="stylesheet">
</head>
<body class="fixed-aside fixed-content" style="padding-right: 0!important">
<div id="printed"></div>
<div id="unprinted">
    <div class="app" id="app">
        <header class="app-header box-shadow-6">
            <div class="navbar navbar-expand-lg">
                <span id="preload" style="position: absolute;left: 0;">
                </span>
                <!-- Page title -->
                <!-- brand -->
                <a href="{{ route('DashboardIndex') }}" class="navbar-brand ajax-nav">
                    <span class="hidden-folded d-inline">CRM</span>
                </a>
                <!-- / brand -->
                <ul class="nav flex-row order-lg-2">
                    <!-- Notification -->
                    {!! \App\Http\Controllers\NotificationController::headerNotifications() !!}
                    {!! \App\Http\Controllers\UserController::headerUser() !!}
                </ul>
                <!-- Navbar collapse -->
                <div class="collapse navbar-collapse nav-active-theme order-lg-1" id="navbarToggler">
                    <ul class="nav navfh navbar-nav">
                        <li id="store_link" class="nav-item">
                            <a href="{{ route('StoreIndex', ['active_tab' => 'store']) }}" class="nav-link ajax-nav">
                                Склад
                                <div class="pr"><div class="pr_bt"></div><div class="pr_bt"></div><div class="pr_bt"></div></div>
                            </a>
                        </li>
    {{--                    <li id="services_link" class="nav-item">--}}
    {{--                        <a href="{{ route('ServicesIndex') }}" class="nav-link ajax-nav">--}}
    {{--                            Услуги--}}
    {{--                            <div class="pr"><div class="pr_bt"></div><div class="pr_bt"></div><div class="pr_bt"></div></div>--}}
    {{--                        </a>--}}
    {{--                    </li>--}}
                        <li id="cash_link" class="nav-item">
                            <a href="{{ route('CashIndex', ['active_tab' => 'warrant']) }}" class="nav-link ajax-nav">
                                Деньги
                                <div class="pr"><div class="pr_bt"></div><div class="pr_bt"></div><div class="pr_bt"></div></div>
                            </a>
                        </li>
                        <li id="employee_link" class="nav-item">
                            <a href="{{ route('EmployeeIndex') }}" class="nav-link ajax-nav">
                                Сотрудники
                                <div class="pr"><div class="pr_bt"></div><div class="pr_bt"></div><div class="pr_bt"></div></div>
                            </a>
                        </li>
                        <li id="partner_link" class="nav-item">
                            <a href="{{ route('PartnerIndex') }}" class="nav-link ajax-nav">
                                Контрагенты
                                <div class="pr"><div class="pr_bt"></div><div class="pr_bt"></div><div class="pr_bt"></div></div>
                            </a>

                        </li>
                        {{--<li id="report_link" class="nav-item">--}}
                            {{--<a href="{{ route('ReportIndex') }}" class="nav-link ajax-nav">--}}
                                {{--Отчеты--}}
                                {{--<div class="pr"><div class="pr_bt"></div><div class="pr_bt"></div><div class="pr_bt"></div></div>--}}
                            {{--</a>--}}
                        {{--</li>--}}
                        <li id="settings_link" class="nav-item">
                            <a href="{{ route('SettingsIndex', ['active_tab' => 'index']) }}" class="nav-link ajax-nav">
                                Настройки
                                <div class="pr"><div class="pr_bt"></div><div class="pr_bt"></div><div class="pr_bt"></div></div>
                            </a>
                        </li>
                        <li id="shedule_link" class="nav-item">
                            <a href="{{ route('ScheduleIndex') }}" class="nav-link ajax-nav">
                                Планировщик
                                <div class="pr"><div class="pr_bt"></div><div class="pr_bt"></div><div class="pr_bt"></div></div>
                            </a>
                        </li>
                        {{--<li id="shedule_link" class="nav-item">--}}
                            {{--<input id="xhr" type="text">--}}
                        {{--</li>--}}
                    </ul>
                </div>
            </div>
        </header>
        <div id="aside" class="app-aside folded dark">
            <div class="sidenav hv">
                <div class="navbar lt">
                </div>
                <div class="flex hide-scroll">
                    <div class="scroll">
                        <div class="show-text nav-active-text" data-nav="">
                            @include('template.aside')
                        </div>
                    </div>
                </div>
                <!-- sidenav bottom -->
                <div class="py-2 mt-2 b-t no-shrink">
                    <ul class="nav no-border">
                        <li>
                            <a onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                                <span class="nav-icon">
                                    <i class="fa fa-power-off"></i>
                                </span>
                                <span class="nav-text">Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="content" class="app-content box-shadow-0" role="main">
            <div class="content-header bg-white">
                <div class="navbar">
                    <div class="collapse navbar-collapse order-lg-1" id="navbarToggler">
                        <ul class="navbar-nav mt-2 mt-lg-0 mx-0 mx-lg-2 ">
                            <li class="nav-item">
                                <a href="dashboard.8.html" class="nav-link" data-pjax-state="">
                                    Dashboard
                                </a>
                            </li>
                            <li class="nav-item dropdown">
                                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" data-pjax-state="">
                                    Apps
                                </a>
                                <div class="dropdown-menu mt-2 w pt-2 mt-2 animate fadeIn">
                                    <a href="app.user.html" class="dropdown-item">
                                        Users
                                    </a>
                                    <a href="app.message.html" class="dropdown-item">
                                        Messages
                                    </a>
                                    <a href="app.inbox.html" class="dropdown-item">
                                        Inbox
                                    </a>
                                    <a href="ui.calendar.html" class="dropdown-item">
                                        Calendar
                                    </a>
                                </div>
                            </li>
                        </ul>
                        <form class="input-group m-2 my-lg-0">
                            <span class="input-group-btn">
                              <button type="button" class="btn no-border no-bg no-shadow waves-effect"><i class="fa fa-search"></i></button>
                            </span>
                            <input type="text" class="form-control no-border no-bg no-shadow" placeholder="Search projects...">
                        </form>
                    </div>
                </div>
            </div>
            <div class="d-flex flex" id="ajax-content">
                @yield('content')
            </div>
            <div class="content-footer bg-white">
                <div class="d-flex p-3">
                    <span class="text-sm text-muted flex">&copy; Copyright. Flatfull</span>
                    <div class="text-sm text-muted">Version 1.2.0</div>
                </div>
            </div>
        </div>
    </div>
    <div id="dialogs"></div>
</div>
<script src="{{ asset('js/app.js') }}" defer></script>
<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
    @csrf
</form>

<div id="login-form" class="hide dark h-v d-flex flex align-items-center">

</div>

</body>
</html>