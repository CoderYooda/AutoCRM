@extends($request['view_as'] == 'json' ? 'layouts.XHR' : 'layouts.main')

@section('title', $page ?? 'crm')

@section('content')
<div id="cash_index_page" class="d-flex flex">
    <div class="fade aside aside-sm b-r w-200" id="content-aside">
        <div class="modal-dialog light d-flex flex-column w-md lt">
            <div class="navbar no-radius pos-rlt">
                <span class="text-md">Деньги</span>
            </div>
            <div class="scrollable hover">
                <div class="sidenav mt-2">
                    <nav class="nav-border b-primary" data-nav>
                        <ul class="nav">
                            <li id="warrant-tab" data-tab="warrant" data-default="true" class="@if($request['active_tab'] == 'warrant' || $request['active_tab'] == null) active @endif tab">
                                <a href="{{ route('CashIndex', ['active_tab' => 'warrant', 'target' => 'ajax-tab-content']) }}" class="ajax-nav">
                                    <span class="nav-text">Деньги</span>
                                </a>
                            </li>
                            <li id="cashmove-tab" data-tab="cashmove" class="@if($request['active_tab'] == 'cashmove') active @endif tab">
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
            <div class="mt-auto">
                <div class="box mb-0">
                    <div class="box-body p-0">
                        <canvas id="chart-doughnut" height="130" class="pb-3 pt-3" data-income="{{$income}}" data-outcome="{{ $outcome }}">
                        </canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="d-flex flex" id="ajax-tab-content">
        @yield('tab')
    </div>
</div>

@endsection

