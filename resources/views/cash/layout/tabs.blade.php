@extends($request['view_as'] == 'json' ? 'layouts.XHR' : 'layouts.main')

@section('title', $page ?? 'crm')

@section('content')
<div id="cash_index_page" class="d-flex flex">
    <div class="fade aside aside-sm b-r w-200" id="content-aside">
        <div class="modal-dialog d-flex flex-column w-md light lt">
            <div class="navbar white no-radius box-shadow pos-rlt">
                <span class="text-md">Деньги</span>
            </div>
            <div class="scrollable hover">
                <div class="sidenav mt-2">
                    <nav class="nav-border b-primary" data-nav>
                        <ul class="nav">
                            <li id="warrant-tab" data-tab="warrant" data-default="true" class="active tab">
                                <a href="{{ route('CashIndex', ['active_tab' => 'warrant', 'target' => 'ajax-tab-content']) }}" class="ajax-nav">
                                    <span class="nav-text">Деньги</span>
                                </a>
                            </li>
                            <li id="cashmove-tab" data-tab="cashmove" class="tab">
                                <a href="{{ route('CashIndex', ['active_tab' => 'cashmove', 'target' => 'ajax-tab-content']) }}" class="ajax-nav">
                                    <span class="nav-badge">
				                  	</span>
                                    <span class="nav-text">Перемещения</span>
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

