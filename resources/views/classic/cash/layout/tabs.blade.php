@extends($request['view_as'] == 'json' ? env('DEFAULT_THEME', 'classic') . '.layouts.XHR' : env('DEFAULT_THEME', 'classic') . '.layouts.main')

@section('title', $page ?? 'crm')

@section('content')

<div class="side-menu w-180">
    <ul class="nav">
        @can('Смотреть денежные операции')
            <li id="warrant-tab" data-tab="warrant" data-default="true" class="@if($request['active_tab'] == 'warrant' || $request['active_tab'] == null) active @endif">
                <a class="ajax-nav" href="{{ route('CashIndex', ['active_tab' => 'warrant', 'target' => 'ajax-tab-content']) }}">Кассовые ордера</a>
            </li>
        @endcan
        @can('Смотреть денежные перемещения')
            <li id="cashmove-tab" data-tab="cashmove" class="@if($request['active_tab'] == 'cashmove') active @endif">
                <a class="ajax-nav" href="{{ route('CashIndex', ['active_tab' => 'cashmove', 'target' => 'ajax-tab-content']) }}">Перемещения</a>
            </li>
        @endcan
    </ul>
</div>
<div id="ajax-tab-content" class="main-content">
    @yield('tab')
</div>
@endsection

