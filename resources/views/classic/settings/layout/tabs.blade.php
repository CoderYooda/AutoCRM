@extends($request['view_as'] == 'json' ? env('DEFAULT_THEME', 'classic') .'.layouts.XHR' : 'classic.layouts.main')

@section('title', $page ?? 'Настройки')

@section('content')
    <div id="left_menu_draggable" class="side-menu">
        <ul class="nav">
            <li id="setting-index-tab" data-tab="index" data-default="true" class="@if($request['active_tab'] == 'index' || $request['active_tab'] == null) active @endif tab">
                <a href="{{ route('SettingsIndex', ['active_tab' => 'index', 'target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">
                    <span class="nav-text">Основное</span>
                </a>
            </li>
            <li id="setting-index-tab" data-tab="requisites" data-default="true" class="@if($request['active_tab'] == 'requisites' || $request['active_tab'] == null) active @endif tab">
                <a href="{{ route('SettingsIndex', ['active_tab' => 'requisites', 'target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">
                    <span class="nav-text">Реквизиты</span>
                </a>
            </li>
            <li id="setting-cashbox-tab" data-tab="cashbox" class="@if($request['active_tab'] == 'cashbox') active @endif tab">
                <a href="{{ route('SettingsIndex', ['active_tab' => 'cashbox', 'target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">
                    <span class="nav-text">Кассы</span>
                </a>
            </li>
            <li id="setting-cashbox-tab" data-tab="store" class="@if($request['active_tab'] == 'store') active @endif tab">
                <a href="{{ route('SettingsIndex', ['active_tab' => 'store', 'target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">
                    <span class="nav-text">Склады</span>
                </a>
            </li>
            <li id="setting-role-tab" data-tab="role" class="@if($request['active_tab'] == 'role') active @endif tab">
                <a href="{{ route('SettingsIndex', ['active_tab' => 'role', 'target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">
                    <span class="nav-text">Роли</span>
                </a>
            </li>
            <li id="setting-sms-tab" data-tab="sms" class="@if($request['active_tab'] == 'sms') active @endif tab">
                <a href="{{ route('SettingsIndex', ['active_tab' => 'sms', 'target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">
                    <span class="nav-text">Смс</span>
                </a>
            </li>   
            <li id="setting-services-tab" data-tab="services" class="@if($request['active_tab'] == 'services') active @endif tab">
                <a href="{{ route('SettingsIndex', ['active_tab' => 'services', 'target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">
                    <span class="nav-text">Сервисы</span>
                </a>
            </li>
        </ul>
        <div onclick="system.toggleMenu()" id="left_menu_toggle" class="toggle"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>
    </div>
    <div id="ajax-tab-content" class="main-content">
        @yield('tab')
    </div>

@endsection

