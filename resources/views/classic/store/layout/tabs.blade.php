@extends($request['view_as'] == 'json' ? env('DEFAULT_THEME', 'classic') . '.layouts.XHR' : 'classic.layouts.main')

@section('title', $page ?? 'Склад')

@section('content')

<div id="left_menu_draggable" class="side-menu">
    <ul class="nav">
        @can('Смотреть товары')
            <li id="store-tab" data-tab="store" data-default="true" class="@if($request['active_tab'] == 'store' || $request['active_tab'] == null) active @endif">
                <a class="ajax-nav" href="{{ route('StoreIndex', ['active_tab' => 'store', 'target' => 'ajax-tab-content']) }}">База товаров</a>
            </li>
        @endcan
        @can('Смотреть заявки поставщикам')
            <li id="provider_orders-tab" data-tab="provider_orders" class="@if($request['active_tab'] == 'provider_orders') active @endif">
                <a class="ajax-nav" href="{{ route('StoreIndex', ['active_tab' => 'provider_orders', 'target' => 'ajax-tab-content']) }}">Заявки поставщикам</a>
            </li>
        @endcan
        @can('Смотреть поступления')
            <li id="income-tab" data-tab="entrance" class="@if($request['active_tab'] == 'entrance') active @endif">
                <a class="ajax-nav" href="{{ route('StoreIndex', ['active_tab' => 'entrance', 'target' => 'ajax-tab-content']) }}">Поступления</a>
            </li>
        @endcan
        @can('Смотреть продажи')
            <li id="shipments-tab" data-tab="shipments" class="@if($request['active_tab'] == 'shipments') active @endif">
                <a class="ajax-nav" href="{{ route('StoreIndex', ['active_tab' => 'shipments', 'target' => 'ajax-tab-content']) }}">Продажи</a>
            </li>
        @endcan
        @can('Смотреть возвраты')
            <li id="refund-tab" data-tab="refund" class="@if($request['active_tab'] == 'refund') active @endif">
                <a class="ajax-nav" href="{{ route('StoreIndex', ['active_tab' => 'refund', 'target' => 'ajax-tab-content']) }}">Возвраты</a>
            </li>
        @endcan
        @can('Смотреть заказ клиента')
            <li id="client_orders-tab" data-tab="client_orders" class="@if($request['active_tab'] == 'client_orders') active @endif">
                <a class="ajax-nav" href="{{ route('StoreIndex', ['active_tab' => 'client_orders', 'target' => 'ajax-tab-content']) }}">Заказы клиентов</a>
            </li>
        @endcan
        @can('Смотреть корректировки')
            <li id="adjustment-tab" data-tab="adjustment" class="@if($request['active_tab'] == 'adjustment') active @endif">
                <a class="ajax-nav" href="{{ route('StoreIndex', ['active_tab' => 'adjustment']) }}">Корректировки</a>
            </li>
        @endcan
    </ul>
    <div onclick="system.toggleMenu()" id="left_menu_toggle" class="toggle"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>
</div>
<div id="ajax-tab-content" class="main-content">
    @yield('tab')
</div>
@endsection

