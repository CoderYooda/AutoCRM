{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'layouts.TabXHR' : 'settings.layout.tabs')

@section('tab')
<div class="d-flex flex-column flex">
    <div class="navbar no-radius box-shadow pos-rlt white">
        <div class="flex">
            <div class="input-group">
                <input id="search" type="text" value="" class="form-control form-control-sm search"  placeholder="Поиск по складу">
                <span class="input-group-append">
                    <button class="btn btn-default btn-sm no-shadow" type="button"><i class="fa fa-search"></i></button>
                </span>
            </div>
        </div>
        <span class="m-b btn-groups pl-1">

        </span>
    </div>
    <div class="d-flex flex scroll-y">
        <div class="d-flex flex-column flex lt">
            <div id="ajax-table" class="padding b-r d-table">
{{--                @include('product.elements.table_container')--}}
            </div>
        </div>
{{--        <div class="d-flex flex-column w-xxl">--}}
{{--            <div class="scrollable hover">--}}
{{--            </div>--}}
{{--        </div>--}}
    </div>
</div>
@endsection

