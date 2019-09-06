@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'layouts.TabXHR' : 'product.layout.tabs')

@section('tab')
    <div class="d-flex flex-column flex">
        <div class="navbar white no-radius box-shadow pos-rlt">
            <div class="flex">
            </div>
            <span class="m-b btn-groups pl-1">
                <button onclick="openDialog('createEntrance')" class="btn btn-sm success mb-0">Новое поступление</button>
            </span>
        </div>
        <div class="d-flex flex scroll-y">
            <div class="d-flex flex-column white  flex lt">
                <div id="ajax-table-entrance" class="p-3 b-r d-table">
                    @include('entrance.table_container')
                </div>
            </div>
        </div>
    </div>
@endsection
