@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? env('DEFAULT_THEME', 'classic') . '.layouts.TabXHR' : 'classic.settings.layout.tabs')

@section('title', $page ?? 'Склад')

@section('tab')
    @include(env('DEFAULT_THEME', 'classic') . '.settings.elements.base_settings')
@endsection

