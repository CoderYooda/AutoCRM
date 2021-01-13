{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'layouts.TabXHR' : 'settings.layout.tabs')

@section('tab')
    <div class="d-flex flex-column flex" id="baseSettings">
        <div class="navbar no-radius box-shadow pos-rlt white">
            <div class="navbar-text nav-title flex" id="pageTitle">Основные настройки</div>
        </div>
        <div class="d-flex flex scroll-y" id="baseSettingsForm">
            @include('settings.elements.base_settings')
        </div>
    </div>
@endsection

