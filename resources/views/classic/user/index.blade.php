@extends($request['view_as'] == 'json' ? get_template() .'.layouts.XHR' : 'classic.layouts.main')

@section('title', $page ?? 'Пользователь')

@section('content')
    <div class="side-menu w-180">
        <ul class="nav">
            <li id="profile-tab" data-tab="profile" data-default="true" class="@if($request['active_tab'] == 'profile') active @endif nav-item tab">
                <a href="{{ route('UserIndex', ['active_tab' => 'profile', 'target' => 'ajax-tab-content']) }}"
                   class=" nav-link ajax-nav update_url">
                    Профиль
                </a>
            </li>

            <li id="service-tab" data-tab="service" class="@if($request['active_tab'] == 'service') active @endif nav-item tab">
                <a href="{{ route('UserIndex', ['active_tab' => 'service', 'target' => 'ajax-tab-content']) }}"
                   class="nav-link ajax-nav update_url">
                    Мои услуги
                </a>
            </li>
            @if(auth()->user()->partner->category_id == 7)
                <li id="vehicles-tab" data-tab="vehicles" class="@if($request['active_tab'] == 'vehicles') active @endif nav-item tab">
                    <a href="{{ route('UserIndex', ['active_tab' => 'vehicles', 'target' => 'ajax-tab-content']) }}"
                       class="nav-link ajax-nav update_url">
                       Гараж
                    </a>
                </li>
            @endif
            {{--<li id="setting-cashbox-tab" data-tab="ddsarticle" class="@if($request['active_tab'] == 'ddsarticle') active @endif tab">--}}
            {{--<a href="{{ route('SettingsIndex', ['active_tab' => 'ddsarticle', 'target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">--}}
            {{--<span class="nav-text">Статьи ДДС</span>--}}
            {{--</a>--}}
            {{--</li>--}}
        </ul>
    </div>
    <div class="main-content ">
        @php $user = !isset($user) ? \App\Http\Controllers\UserController::getUserById($request) : $user @endphp
        <div id="user_index_page" class="d-flex flex">
            <div class="content-menu w-260">
                <div class="box mb-15">
                    <div class="p-15">
                        <small class="user_ava_id">ID {{ $user->id }}</small>
                        <div class="user_ava">
                            <img class="user_avatar" src="{{ $user->getAvatarUrl() }}" alt="...">
                        </div>
                        @if(isset($user) && $user->barcode != null)
                            <img class="w-100" src="data:image/png;base64,{!! getBarCodePNG($user->barcode) !!}" alt="barcode" />
                        @endif

                        <button  onclick="document.getElementById('file_upload').click()" class="button primary w-100">Обновить фото</button>
                        <input style="display: none" id="file_upload" type="file" name="file" class="form-control" onchange="user.uploadImage(this)">

                        <div class="links-block mt-15 text-center">
                            <a href="{{ route('UserPassChange', ['target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">Сменить пароль</a>
                        </div>
                    </div>
                </div>
                {{--<div class="box">--}}
                    {{--<div class="p-15">--}}
                    {{--</div>--}}
                {{--</div>--}}
            </div>
            <div id="ajax-tab-content" class="box-lister">
                @yield('tab')
            </div>
        </div>

    </div>

@endsection



