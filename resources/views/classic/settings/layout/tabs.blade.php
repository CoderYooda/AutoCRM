@extends($request['view_as'] == 'json' ? env('DEFAULT_THEME', 'classic') .'.layouts.XHR' : 'classic.layouts.main')

@section('title', $page ?? 'Настройки')

@section('content')
    <div class="side-menu w-180">
        <ul class="nav">
            <li id="setting-index-tab" data-tab="index" data-default="true" class="@if($request['active_tab'] == 'index' || $request['active_tab'] == null) active @endif tab">
                <a href="{{ route('SettingsIndex', ['active_tab' => 'index', 'target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">
                    <span class="nav-text">Основное</span>
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
            <li id="setting-cashbox-tab" data-tab="ddsarticle" class="@if($request['active_tab'] == 'ddsarticle') active @endif tab">
                <a href="{{ route('SettingsIndex', ['active_tab' => 'ddsarticle', 'target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">
                    <span class="nav-text">Статьи ДДС</span>
                </a>
            </li>
        </ul>
    </div>
    <div id="ajax-tab-content" class="main-content">
        @yield('tab')
    </div>

@endsection

