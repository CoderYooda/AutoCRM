@extends($request['view_as'] == 'json' ? get_template() . '.layouts.XHR' : 'classic.layouts.main')

@section('content')
    <div id="left_menu_draggable" class="side-menu">
        <ul class="nav">
            <li id="companies-tab" data-tab="companies" data-default="true" class="@if($request['active_tab'] == 'companies' || $request['active_tab'] == null) active @endif">
                <a class="ajax-nav" href="{{ route('AdminDashboard', ['active_tab' => 'companies', 'target' => 'ajax-tab-content']) }}">Компании</a>
            </li>
            <li id="users-tab" data-tab="users" class="@if($request['active_tab'] == 'users') active @endif">
                <a class="ajax-nav" href="{{ route('AdminDashboard', ['active_tab' => 'users', 'target' => 'ajax-tab-content']) }}">Пользователи</a>
            </li>
        </ul>
        <div onclick="system.toggleMenu()" id="left_menu_toggle" class="toggle"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>
    </div>

    <div id="ajax-tab-content" class="main-content">
        @yield('tab')
    </div>

@endsection
