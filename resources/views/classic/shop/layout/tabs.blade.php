@extends($request['view_as'] == 'json' ? get_template() . '.layouts.XHR' : 'classic.layouts.main')

@section('title', $page ?? 'Интернет-магазин')

@section('content')

    <div id="left_menu_draggable" class="side-menu">
        <ul class="nav">
            <li id="contacts-tab" data-tab="contacts" data-default="true" class="@if($request['active_tab'] == 'contacts' || $request['active_tab'] == null) active @endif">
                <a class="ajax-nav" href="{{ route('ShopIndex', ['active_tab' => 'contacts', 'target' => 'ajax-tab-content']) }}">Контакты</a>
            </li>
            <li id="about-tab" data-tab="about" class="@if($request['active_tab'] == 'about') active @endif">
                <a class="ajax-nav" href="{{ route('ShopIndex', ['active_tab' => 'about', 'target' => 'ajax-tab-content']) }}">О Компании</a>
            </li>
            <li id="delivery-tab" data-tab="delivery" class="@if($request['active_tab'] == 'delivery') active @endif">
                <a class="ajax-nav" href="{{ route('ShopIndex', ['active_tab' => 'delivery', 'target' => 'ajax-tab-content']) }}">Оплата и доставка</a>
            </li>
            <li id="warranty-tab" data-tab="warranty" class="@if($request['active_tab'] == 'warranty') active @endif">
                <a class="ajax-nav" href="{{ route('ShopIndex', ['active_tab' => 'warranty', 'target' => 'ajax-tab-content']) }}">Гарантия и возврат</a>
            </li>
            <li id="settings-tab" data-tab="settings" class="@if($request['active_tab'] == 'settings') active @endif">
                <a class="ajax-nav" href="{{ route('ShopIndex', ['active_tab' => 'settings', 'target' => 'ajax-tab-content']) }}">Настройки</a>
            </li>
            <li id="analytics-tab" data-tab="analytics" class="@if($request['active_tab'] == 'analytics') active @endif">
                <a class="ajax-nav" href="{{ route('ShopIndex', ['active_tab' => 'analytics', 'target' => 'ajax-tab-content']) }}">Аналитика</a>
            </li>
            <li id="payment_methods-tab" data-tab="payment_methods" class="@if($request['active_tab'] == 'payment_methods') active @endif">
                <a class="ajax-nav" href="{{ route('ShopIndex', ['active_tab' => 'payment_methods', 'target' => 'ajax-tab-content']) }}">Способы оплаты</a>
            </li>
        </ul>
        <div onclick="system.toggleMenu()" id="left_menu_toggle" class="toggle"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>
    </div>

    <div id="ajax-tab-content" class="main-content">
        @yield('tab')
    </div>

@endsection

