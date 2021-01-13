{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] != null ? 'layouts.TabXHR' : 'store.layout.tabs')

@section('tab')
    <div class="d-flex flex-column flex" id="user-list">
        <div class="navbar white no-radius box-shadow pos-rlt">
            <form class="flex">
                <div class="input-group">
                    <input id="search_partner" type="text" value="{{ request('search') }}" class="form-control form-control-sm search"  placeholder="Поиск по складу">
                    <span class="input-group-append">
                    <button class="btn btn-default btn-sm no-shadow" type="button"><i class="fa fa-search"></i></button>
                </span>
                </div>
            </form>
        </div>
        <div class="d-flex flex scroll-y">
            <div class="d-flex flex-column white flex lt">
                <div id="ajax-table-provider" class="white p-3 b-r d-table">
                    @include('provider.elements.table_container')
                </div>
            </div>
        </div>
    </div>
@endsection

