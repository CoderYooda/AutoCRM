@extends($request['view_as'] == 'json' ? get_template() . '.layouts.XHR' : get_template() . '.layouts.main')

@section('title', $page ?? 'crm')

@section('content')

<div id="left_menu_draggable" class="side-menu">
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
        {{--@can('Смотреть денежные перемещения')--}}
            <li id="salarypayments-tab" data-tab="salarypayments" class="@if($request['active_tab'] == 'salarypayments') active @endif">
                <a class="ajax-nav" href="{{ route('CashIndex', ['active_tab' => 'salarypayments', 'target' => 'ajax-tab-content']) }}">Выплаты зарплат</a>
            </li>
        {{--@endcan--}}
    </ul>
    <div onclick="system.toggleMenu()" id="left_menu_toggle" class="toggle"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>
</div>
<div id="ajax-tab-content" class="main-content">
    @yield('tab')
</div>
@endsection

