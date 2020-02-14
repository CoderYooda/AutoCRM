@extends($request['view_as'] == 'json' ? env('DEFAULT_THEME', 'classic') . '.layouts.XHR' : 'classic.layouts.main')

@section('title', $page ?? 'Склад')

@section('content')

<div class="side-menu w-180">
    <ul class="nav">
        <li id="store-tab" data-tab="store" data-default="true" class="@if($request['active_tab'] == 'store' || $request['active_tab'] == null) active @endif">
            <a class="ajax-nav" href="{{ route('StoreIndex', ['active_tab' => 'store', 'target' => 'ajax-tab-content']) }}">База товаров</a>
        </li>
        <li id="provider_orders-tab" data-tab="provider_orders" class="@if($request['active_tab'] == 'provider_orders') active @endif">
            <a class="ajax-nav" href="{{ route('StoreIndex', ['active_tab' => 'provider_orders', 'target' => 'ajax-tab-content']) }}">Заявки поставщикам</a>
        </li>
        <li id="income-tab" data-tab="entrance" class="@if($request['active_tab'] == 'entrance') active @endif">
            <a class="ajax-nav" href="{{ route('StoreIndex', ['active_tab' => 'entrance', 'target' => 'ajax-tab-content']) }}">Поступления</a>
        </li>
        <li id="shipments-tab" data-tab="shipments" class="@if($request['active_tab'] == 'shipments') active @endif">
            <a class="ajax-nav" href="{{ route('StoreIndex', ['active_tab' => 'shipments', 'target' => 'ajax-tab-content']) }}">Продажи</a>
        </li>
        <li id="client_orders-tab" data-tab="client_orders" class="@if($request['active_tab'] == 'client_orders') active @endif">
            <a class="ajax-nav" href="{{ route('StoreIndex', ['active_tab' => 'client_orders', 'target' => 'ajax-tab-content']) }}">Заказы клиентов</a>
        </li>
        <li id="adjustment-tab" data-tab="adjustment" class="@if($request['active_tab'] == 'adjustment') active @endif">
            <a class="ajax-nav" href="{{ route('StoreIndex', ['active_tab' => 'adjustment']) }}">Корректировки</a>
        </li>
    </ul>
</div>
<div id="ajax-tab-content" class="main-content">
    @yield('tab')
</div>
@endsection

