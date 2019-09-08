@extends($request['view_as'] == 'json' ? 'layouts.XHR' : 'layouts.main')

@section('content')
<div class="d-flex flex">
    <div class="fade aside aside-sm b-r w-200" id="content-aside">
        <div class="modal-dialog light d-flex flex-column w-md lt">
            <div class="navbar no-radius pos-rlt">
                <span class="text-md">Товары</span>
            </div>
            <div class="scrollable hover">
                <div class="sidenav mt-2">
                    <nav class="nav-border b-primary" data-nav>
                        <ul class="nav">
                            <li class="active" id="store-tab" data-tab="store">
                                <a href="{{ route('StoreIndex', ['active_tab' => 'store', 'target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">
                                    <span class="nav-text">Склад</span>
                                </a>
                            </li>
                            <li id="provider-tab" data-tab="provider">
                                <a href="{{ route('StoreIndex', ['active_tab' => 'provider', 'target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">
                                    <span class="nav-badge">
				                  	</span>
                                    <span class="nav-text">У поставщиков</span>
                                </a>
                            </li>
                            <li id="income-tab" data-tab="entrance">
                                <a href="{{ route('StoreIndex', ['active_tab' => 'entrance', 'target' => 'ajax-tab-content']) }}" class="ajax-nav">
                                    <span class="nav-text">Поступления</span>
                                </a>
                            </li>
                            <li id="sales-tab" data-tab="sales">
                                <a href="{{ route('StoreIndex', ['active_tab' => 'sales']) }}">
                                    <span class="nav-text">Продажи</span>
                                </a>
                            </li>
                            <li id="client_orders-tab" data-tab="client_orders">
                                <a href="{{ route('StoreIndex', ['active_tab' => 'client_orders']) }}">
                                    <span class="nav-text">Заказы клиентов</span>
                                </a>
                            </li>
                            <li id="provider_orders-tab" data-tab="provider_orders">
                                <a href="{{ route('StoreIndex', ['active_tab' => 'provider_orders']) }}">
                                    <span class="nav-text">Заказы поставщикам</span>
                                </a>
                            </li>
                            <li id="adjustment-tab" data-tab="adjustment">
                                <a href="{{ route('StoreIndex', ['active_tab' => 'adjustment']) }}">
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

