@extends($request['view_as'] == 'json' ? env('DEFAULT_THEME', 'classic') .'.layouts.XHR' : 'classic.layouts.main')

@section('title', $page ?? 'Пользователь')

@section('content')
    <div class="side-menu w-180">
        <ul class="nav">
            <li id="profile-tab" data-tab="profile" data-default="true" class="@if($request['active_tab'] == 'profile') active @endif nav-item tab">
                <a href="{{ route('UserIndex', ['id' => $request['id'], 'active_tab' => 'profile', 'target' => 'ajax-tab-content']) }}"
                   class=" nav-link ajax-nav update_url">
                    Профиль
                </a>
            </li>

            <li id="scheme-tab" data-tab="scheme" class="@if($request['active_tab'] == 'scheme') active @endif nav-item tab">
                <a href="{{ route('UserIndex', ['id' => $request['id'], 'active_tab' => 'scheme', 'target' => 'ajax-tab-content']) }}"
                   class="nav-link ajax-nav update_url">
                    Схема зарплаты
                </a>
            </li>
            <li id="premium-tab" data-tab="premium" class="@if($request['active_tab'] == 'premium') active @endif nav-item tab">
                <a href="{{ route('UserIndex', ['id' => $request['id'], 'active_tab' => 'premium', 'target' => 'ajax-tab-content']) }}"
                   class=" nav-link ajax-nav update_url">
                    Премии
                </a>
            </li>
            <li id="payout-tab" data-tab="payout" class="@if($request['active_tab'] == 'payout') active @endif nav-item tab">
                <a href="{{ route('UserIndex', ['id' => $request['id'], 'active_tab' => 'payout', 'target' => 'ajax-tab-content']) }}"
                   class="nav-link ajax-nav update_url">
                    Выплаты
                </a>
            </li>
            <li id="sales-tab" data-tab="sales" class="@if($request['active_tab'] == 'sales') active @endif nav-item tab">
                <a href="{{ route('UserIndex', ['id' => $request['id'], 'active_tab' => 'sales', 'target' => 'ajax-tab-content']) }}"
                   class="nav-link ajax-nav update_url">
                    Продажи
                </a>
            </li>
            {{--<li id="setting-cashbox-tab" data-tab="ddsarticle" class="@if($request['active_tab'] == 'ddsarticle') active @endif tab">--}}
            {{--<a href="{{ route('SettingsIndex', ['active_tab' => 'ddsarticle', 'target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">--}}
            {{--<span class="nav-text">Статьи ДДС</span>--}}
            {{--</a>--}}
            {{--</li>--}}
        </ul>
    </div>
    <div class="main-content ">
        @php $user = \App\Http\Controllers\UserController::getUser($request) @endphp
        <div id="user_index_page" class="d-flex flex">
            <div class="content-menu w-260">
                <div class="box mb-15">
                    <div class="p-15">
                        <small class="user_ava_id">ID 234</small>
                        <div class="user_ava">

                        </div>
                    </div>
                </div>
                <div class="box">
                    <div class="p-15">
                    </div>
                </div>
            </div>
            <div id="ajax-tab-content" class="content-menu box box-lister">
                @yield('tab')
            </div>
        </div>

    </div>

@endsection


