@extends($request['view_as'] == 'json' ? get_template() . '.layouts.XHR' : 'classic.layouts.main')

@section('title', $page ?? 'Настройки интернет-магазина')

@section('content')

    <div id="left_menu_draggable" class="side-menu">
        <ul class="nav">
            <li id="main-tab" data-tab="main" data-default="true" class="@if($request['active_tab'] == 'main' || $request['active_tab'] == null) active @endif">
                <a class="ajax-nav" href="{{ route('ShopIndex', ['active_tab' => 'main', 'target' => 'ajax-tab-content']) }}">Основное</a>
            </li>
            <li id="contacts-tab" data-tab="contacts" class="@if($request['active_tab'] == 'contacts') active @endif">
                <a class="ajax-nav" href="{{ route('ShopIndex', ['active_tab' => 'contacts', 'target' => 'ajax-tab-content']) }}">Контакты</a>
            </li>
            <li id="pages-tab" data-tab="pages" class="@if($request['active_tab'] == 'pages') active @endif">
                <a class="ajax-nav" href="{{ route('ShopIndex', ['active_tab' => 'pages', 'target' => 'ajax-tab-content']) }}">Страницы</a>
            </li>
            <li id="payments-tab" data-tab="payments" class="@if($request['active_tab'] == 'payments') active @endif">
                <a class="ajax-nav" href="{{ route('ShopIndex', ['active_tab' => 'payments', 'target' => 'ajax-tab-content']) }}">Способы оплаты</a>
            </li>
            <li id="traffic-tab" data-tab="traffic" class="@if($request['active_tab'] == 'traffic') active @endif">
                <a class="ajax-nav" href="{{ route('ShopIndex', ['active_tab' => 'traffic', 'target' => 'ajax-tab-content']) }}">Посещаемость</a>
            </li>
            <li id="appearance-tab" data-tab="appearance" class="@if($request['active_tab'] == 'appearance') active @endif">
                <a class="ajax-nav" href="{{ route('ShopIndex', ['active_tab' => 'appearance', 'target' => 'ajax-tab-content']) }}">Внешний вид</a>
            </li>
        </ul>
        <div onclick="system.toggleMenu()" id="left_menu_toggle" class="toggle"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>
    </div>

    <div id="ajax-tab-content" class="main-content">
        @yield('tab')
    </div>

@endsection

