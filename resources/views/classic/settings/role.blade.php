{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? get_template() . '.layouts.TabXHR' : get_template() . '.settings.layout.tabs')

@section('tab')
    <div id="ajax-table-role" class="bottom-container">
        @include(get_template() . '.settings.elements.role_container')
    </div>
@endsection
