@extends($request['view_as'] == 'json' ? 'layouts.XHR' : 'layouts.main')

@section('content')
<div class="d-flex flex">
    <div class="fade aside aside-sm b-r w-200" id="content-aside">
        <div class="modal-dialog d-flex flex-column w-md light lt">
            <div class="navbar white no-radius box-shadow pos-rlt">
                <span class="text-md">Товары</span>
            </div>
            <div class="scrollable hover">
                <div class="sidenav mt-2">
                    <nav class="nav-border b-primary" data-nav>
                        <ul class="nav">
                            <li data-tab="store">
                                <a href="{{ route('StoreIndex', ['active_tab' => 'store', 'target' => 'ajax-tab-content']) }}" class="ajax-nav">
                                    <span class="nav-badge">
				                    	<b class="badge badge-sm badge-pill warn">12</b>
				                  	</span>
                                    <span class="nav-text">Товары</span>
                                </a>
                            </li>
                            <li data-tab="provider">
                                <a href="{{ route('StoreIndex', ['active_tab' => 'provider']) }}">
                                    <span class="nav-badge">
				                    	<b class="badge badge-sm badge-pill warn">12</b>
				                  	</span>
                                    <span class="nav-text">У поставщиков</span>
                                </a>
                            </li>
                            <li>
                                <a href="{{ route('StoreIndex', ['active_tab' => 'income']) }}">
                                    <span class="nav-badge">
				                    	<b class="badge badge-sm badge-pill warn">12</b>
				                  	</span>
                                    <span class="nav-text">Поступления</span>
                                </a>
                            </li>
                            <li>
                                <a href="{{ route('StoreIndex', ['active_tab' => 'sales']) }}">
                                    <span class="nav-badge">
				                    	<b class="badge badge-sm badge-pill warn">12</b>
				                  	</span>
                                    <span class="nav-text">Продажи</span>
                                </a>
                            </li>
                            <li>
                                <a href="{{ route('StoreIndex', ['active_tab' => 'client_orders']) }}">
                                    <span class="nav-badge">
				                    	<b class="badge badge-sm badge-pill warn">12</b>
				                  	</span>
                                    <span class="nav-text">Заказы клиентов</span>
                                </a>
                            </li>
                            <li>
                                <a href="{{ route('StoreIndex', ['active_tab' => 'provider_orders']) }}">
                                    <span class="nav-badge">
				                    	<b class="badge badge-sm badge-pill warn">12</b>
				                  	</span>
                                    <span class="nav-text">Заказы поставщикам</span>
                                </a>
                            </li>
                            <li>
                                <a href="{{ route('StoreIndex', ['active_tab' => 'adjustment']) }}">
                                    <span class="nav-badge">
				                    	<b class="badge badge-sm badge-pill warn">12</b>
				                  	</span>
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

