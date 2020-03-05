{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? env('DEFAULT_THEME', 'classic') . '.layouts.TabXHR' : env('DEFAULT_THEME', 'classic') . '.settings.layout.tabs')

@section('tab')
<div class="m-15 box">
    {{--<div class="navbar white no-radius box-shadow pos-rlt">--}}
        {{--<div class="flex">--}}
        {{--</div>--}}
        {{--<span class="m-b btn-groups pl-1">--}}
            {{--<button onclick="openDialog('cashboxDialog')" class="btn btn-sm success mb-0">Новая касса</button>--}}
        {{--</span>--}}
    {{--</div>--}}
    <div class="m-15">
        <h2 class="mt-0 mb-0 style_header">Кассы</h2>
        <div id="ajax-table-cashbox" class="d-flex flex p-3 row row-sm">
            @include(env('DEFAULT_THEME', 'classic') . '.settings.elements.cashbox_container')
        </div>
    </div>
</div>
@endsection

