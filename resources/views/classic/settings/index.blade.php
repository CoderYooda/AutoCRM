@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? get_template() . '.layouts.TabXHR' : 'classic.settings.layout.tabs')

@section('title', $page ?? 'Склад')

@section('tab')
    @include(get_template() . '.settings.elements.base_settings')
@endsection

