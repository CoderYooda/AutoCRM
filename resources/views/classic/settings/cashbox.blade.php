{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'layouts.TabXHR' : 'settings.layout.tabs')

@section('tab')
<div class="d-flex flex-column flex">
    <div class="navbar white no-radius box-shadow pos-rlt">
        <div class="flex">
        </div>
        <span class="m-b btn-groups pl-1">
            <button onclick="openDialog('cashboxDialog')" class="btn btn-sm success mb-0">Новая касса</button>
        </span>
    </div>
    <div class="d-flex flex scroll-y">
        <div class="d-flex flex-column flex lt">
            <div id="ajax-table-cashbox" class="p-3 b-r d-table">
                @include('settings.elements.cashbox_container')
            </div>
        </div>
    </div>
</div>
@endsection

