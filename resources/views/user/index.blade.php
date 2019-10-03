@extends($request['view_as'] == 'json' ? 'layouts.XHR' : 'layouts.main')

@section('title', $page ?? 'Пользователь')

@section('content')
    @php $user = \App\Http\Controllers\UserController::getUser($request) @endphp

    <div id="user_index_page" class="d-flex flex">
        <div class="d-flex flex">
            <div class="w-100">
                <div class="item dark">
                    <div class="item-bg">
                        <img src="../assets/images/a0.jpg" alt="." class="blur opacity-3">

                    </div>
                    <div class="p-4">
                        <div class="row mt-3">
                            <div class="col-sm-7">
                                <div class="media">
                                    <a href="#">
                                        <span class="w-40 avatar circle blue-grey">
                                    {{--        <i class="on b-white avatar-right"></i>--}}
                                            {{ $user->firstLetterOfName() }}
                                        </span>
                                    </a>
                                    <div class="media-body mx-3 mb-2">
                                        <h4>{{ $user->outputName() }}</h4>
                                        <p class="text-muted"><span class="m-r">{{ $user->category()->first()->name }}</span>
                                        </p>
{{--                                        <div class="block clearfix mb-3">--}}
{{--                                            <a href="#" class="btn btn-icon btn-social btn-rounded b-a btn-sm">--}}
{{--                                                <i class="fa fa-facebook"></i>--}}
{{--                                                <i class="fa fa-facebook indigo"></i>--}}
{{--                                            </a>--}}
{{--                                            <a href="#" class="btn btn-icon btn-social btn-rounded b-a btn-sm">--}}
{{--                                                <i class="fa fa-twitter"></i>--}}
{{--                                                <i class="fa fa-twitter light-blue"></i>--}}
{{--                                            </a>--}}
{{--                                            <a href="#" class="btn btn-icon btn-social btn-rounded b-a btn-sm">--}}
{{--                                                <i class="fa fa-google-plus"></i>--}}
{{--                                                <i class="fa fa-google-plus red"></i>--}}
{{--                                            </a>--}}
{{--                                            <a href="#" class="btn btn-icon btn-social btn-rounded b-a btn-sm">--}}
{{--                                                <i class="fa fa-linkedin"></i>--}}
{{--                                                <i class="fa fa-linkedin cyan"></i>--}}
{{--                                            </a>--}}
{{--                                        </div>--}}
{{--                                        <a href="#" class="btn btn-sm primary btn-rounded success active mb-2" data-toggle-class="success">--}}
{{--                                            <span class="d-inline">Follow</span>--}}
{{--                                            <span class="d-none">Following</span>--}}
{{--                                        </a>--}}
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-5">
{{--                                <p class="text-md profile-status">I am feeling good!</p>--}}
{{--                                <button class="btn btn-sm rounded btn-outline b-success" data-toggle="collapse" data-target="#editor">Edit</button>--}}
{{--                                <div class="collapse box mt-2" id="editor">--}}
{{--                                    <textarea class="form-control no-border" rows="2" placeholder="Type something..."></textarea>--}}
{{--                                </div>--}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="white bg b-b px-3">
                    <div class="row">
                        <div class="col-sm-6 order-sm-2">
                            <div class="py-3 text-center text-sm-right">
                                <a href="#" class="d-inline-block px-3 text-center">
                                    <span class="text-md d-block">200</span>
                                    <small class="text-xs text-muted">Продаж</small>
                                </a>
                                <a href="#" class="d-inline-block px-3 b-l b-r text-center">
                                    <span class="text-md d-block">120.000</span>
                                    <small class="text-xs text-muted">Выручка</small>
                                </a>
                                <a href="#" class="d-inline-block px-3 text-center">
                                    <span class="text-md d-block">12</span>
                                    <small class="text-xs text-muted">Клиентов</small>
                                </a>
                            </div>
                        </div>
                        <div class="col-sm-6 order-sm-1">
                            <div class="py-4 clearfix nav-active-theme">
                                <ul class="nav nav-pills nav-sm">
                                    <li id="profile-tab" data-tab="profile" class="@if($request['active_tab'] == 'profile') active @endif nav-item tab">
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
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="padding">
                    <div class="row">
                        <div class="col-sm-8 col-lg-9">
                            <div id="ajax-tab-content">
                                @yield('tab')
                            </div>
                        </div>
                        <div class="col-sm-4 col-lg-3">
                            <div>
                                <div class="box">
                                    <div class="box-header">
                                        <h3>Сюда что то</h3>
                                    </div>
                                    <div class="box-divider"></div>
                                    123
                                </div>
                                <div class="box">
                                    <div class="box-header">
                                        <h2>Сюда что то</h2>
                                    </div>
                                    <div class="box-divider"></div>
                                    123
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
@endsection

