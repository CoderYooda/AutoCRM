{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? env('DEFAULT_THEME', 'classic') . '.layouts.TabXHR' : env('DEFAULT_THEME', 'classic') . '.settings.layout.tabs')

@section('tab')
    <div id="ajax-table-role" class="bottom-container">
        @include(env('DEFAULT_THEME', 'classic') . '.settings.elements.sms_container')
    </div>
@endsection
