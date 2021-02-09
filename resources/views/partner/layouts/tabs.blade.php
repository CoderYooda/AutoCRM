@extends($request['view_as'] == 'json' ? get_template() . '.layouts.XHR' : 'classic.layouts.main')

@section('content')
    {{--<div id="left_menu_draggable" class="side-menu">--}}
        {{--<ul class="nav">--}}
            {{--<li id="partners-tab" data-tab="partners" class="@if($request['active_tab'] == 'partners') active @endif">--}}
                {{--<a class="ajax-nav" href="{{ route('AdminDashboard', ['active_tab' => 'partners', 'target' => 'ajax-tab-content']) }}">222</a>--}}
            {{--</li>--}}
        {{--</ul>--}}
        {{--<div onclick="system.toggleMenu()" id="left_menu_toggle" class="toggle"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>--}}
    {{--</div>--}}

    <div id="ajax-tab-content" class="main-content">
        @yield('tab')
    </div>

@endsection
