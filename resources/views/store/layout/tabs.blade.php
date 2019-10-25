@extends($request['view_as'] == 'json' ? 'layouts.XHR' : 'layouts.main')

@section('title', $page ?? 'crm')

@section('content')
<div class="d-flex flex">
    <div class="fade aside aside-sm b-r w-200" id="content-aside">
        <div class="modal-dialog light d-flex flex-column w-md lt">
            {{--<div class="navbar no-radius pos-rlt">--}}
                {{--<span class="text-md">Склад</span>--}}
            {{--</div>--}}
            <div class="scrollable hover">
                <div class="sidenav mt-5">
                    <nav class="nav-border b-primary" data-nav>
                        <ul class="nav">
                            <li id="store-tab" data-tab="store" data-default="true" class="@if($request['active_tab'] == 'store' || $request['active_tab'] == null) active @endif tab">
                                <a href="{{ route('StoreIndex', ['active_tab' => 'store', 'target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">
                                    <span class="nav-text">Склад</span>
                                </a>
                            </li>
                            {{--<li data-tab="provider"  class="@if($request['active_tab'] == 'provider') active @endif tab">--}}
                                {{--<a href="{{ route('StoreIndex', ['active_tab' => 'provider', 'target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">--}}
                                    {{--<span class="nav-badge">--}}
				                  	{{--</span>--}}
                                    {{--<span class="nav-text">У поставщиков</span>--}}
                                {{--</a>--}}
                            {{--</li>--}}
                            <li id="income-tab" data-tab="entrance" class="@if($request['active_tab'] == 'entrance') active @endif tab">
                                <a href="{{ route('StoreIndex', ['active_tab' => 'entrance', 'target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">
                                    <span class="nav-text">Поступления</span>
                                </a>
                            </li>
                            <li id="shipments-tab" data-tab="shipments" class="@if($request['active_tab'] == 'shipments') active @endif tab">
                                <a href="{{ route('StoreIndex', ['active_tab' => 'shipments', 'target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">
                                    <span class="nav-text">Продажи</span>
                                </a>
                            </li>
                            <li id="client_orders-tab" data-tab="client_orders" class="@if($request['active_tab'] == 'client_orders') active @endif tab">
                                <a href="{{ route('StoreIndex', ['active_tab' => 'client_orders', 'target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">
                                    <span class="nav-text">Заказы клиентов</span>
                                </a>
                            </li>
                            <li id="provider_orders-tab" data-tab="provider_orders" class="@if($request['active_tab'] == 'provider_orders') active @endif tab">
                                <a href="{{ route('StoreIndex', ['active_tab' => 'provider_orders', 'target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">
                                    <span class="nav-text">Заказы поставщикам</span>
                                </a>
                            </li>
                            <li id="adjustment-tab" data-tab="adjustment" class="@if($request['active_tab'] == 'adjustment') active @endif tab">
                                <a href="{{ route('StoreIndex', ['active_tab' => 'adjustment']) }}" class="ajax-nav update_url">
                                    <span class="nav-text">Корректировка</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
    <div class="d-flex flex" id="ajax-tab-content">
        @yield('tab')
    </div>
</div>

@endsection

