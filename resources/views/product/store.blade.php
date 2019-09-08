{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'layouts.TabXHR' : 'product.layout.tabs')

@section('tab')
<div class="d-flex flex-column flex">
    <div class="navbar white no-radius box-shadow pos-rlt">
        <div class="flex">
            <div class="input-group">
                <input id="search" type="text" value="{{ request('search') }}" class="form-control form-control-sm search"  placeholder="Поиск по складу">
                <span class="input-group-append">
                    <button class="btn btn-default btn-sm no-shadow" type="button"><i class="fa fa-search"></i></button>
                </span>
            </div>
        </div>
        <span class="m-b btn-groups pl-1">
            <button onclick="openDialog('createCategory')" class="btn btn-sm success mb-0">Новая категория</button>
            <button onclick="openDialog('productDialog')" class="btn btn-sm success mb-0">Новый товар</button>
        </span>
    </div>
    <div class="d-flex flex scroll-y">
        <div class="d-flex flex-column white flex lt">
            <div id="ajax-table-product" class="white p-3 b-r d-table">
                @include('product.elements.table_container')
            </div>
        </div>
    </div>
</div>
@endsection

