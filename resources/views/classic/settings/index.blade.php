@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? env('DEFAULT_THEME', 'classic') . '.layouts.TabXHR' : 'classic.settings.layout.tabs')

@section('title', $page ?? 'Склад')

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

