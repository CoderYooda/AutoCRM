@extends($request['view_as'] == 'json' ? 'layouts.XHR' : 'layouts.main')

@section('content')
<div class="d-flex flex">
    <div class="fade aside aside-sm b-r w-200" id="content-aside">
        <div class="modal-dialog d-flex flex-column w-md light lt">
            <div class="navbar white no-radius box-shadow pos-rlt">
                <span class="text-md">Настройки</span>
            </div>
            <div class="scrollable hover">
                <div class="sidenav mt-2">
                    <nav class="nav-border b-primary" data-nav>
                        <ul class="nav">
                            <li id="setting-index-tab" data-tab="index" data-default="true" class="@if($request['active_tab'] == 'index' || $request['active_tab'] == null) active @endif tab">
                                <a href="{{ route('SettingsIndex', ['active_tab' => 'index', 'target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">
                                    <span class="nav-text">Основное</span>
                                </a>
                            </li>
                            <li id="setting-cashbox-tab" data-tab="cashbox" class="@if($request['active_tab'] == 'cashbox') active @endif tab">
                                <a href="{{ route('SettingsIndex', ['active_tab' => 'cashbox', 'target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">
                                    <span class="nav-text">Кассы</span>
                                </a>
                            </li>
                            <li id="setting-cashbox-tab" data-tab="store" class="@if($request['active_tab'] == 'store') active @endif tab">
                                <a href="{{ route('SettingsIndex', ['active_tab' => 'store', 'target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">
                                    <span class="nav-text">Слады</span>
                                </a>
                            </li>
                            <li id="setting-cashbox-tab" data-tab="ddsarticle" class="@if($request['active_tab'] == 'ddsarticle') active @endif tab">
                                <a href="{{ route('SettingsIndex', ['active_tab' => 'ddsarticle', 'target' => 'ajax-tab-content']) }}" class="ajax-nav update_url">
                                    <span class="nav-text">Статьи ДДС</span>
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

