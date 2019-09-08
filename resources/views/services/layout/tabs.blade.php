@extends($request['view_as'] == 'json' ? 'layouts.XHR' : 'layouts.main')

@section('content')
    <div class="d-flex flex">
        <div class="fade aside aside-sm b-r w-200" id="content-aside">
            <div class="modal-dialog d-flex flex-column w-md light lt">
                <div class="navbar white no-radius box-shadow pos-rlt">
                    <span class="text-md">Услуги</span>
                </div>
                <div class="scrollable hover">
                    <div class="sidenav mt-2">
                        <nav class="nav-border b-primary" data-nav>
                            <ul class="nav">
                                <li id="store-tab" data-tab="store">
                                    <a href="{{ route('ServicesIndex', ['active_tab' => 'services', 'target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">
                                        <span class="nav-text">Деньги</span>
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

