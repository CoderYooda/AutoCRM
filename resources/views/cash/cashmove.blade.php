@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'layouts.TabXHR' : 'cash.layout.tabs')

@section('tab')
    <div class="d-flex flex-column flex">
        <div class="navbar white no-radius box-shadow pos-rlt">
            <div class="d-flex flex-row flex">
                123
            </div>
            <span class="m-b btn-groups pl-1">
            <button onclick="openDialog('warrantDialog', '&isIncoming=1')" class="btn btn-sm white mb-0">Новый приходный ордер</button>
            <button onclick="openDialog('warrantDialog', '&isIncoming=0')" class="btn btn-sm white mb-0">Новый расходный ордер</button>
        </span>
        </div>
        <div id="ajax-table-warrant" class="d-flex flex-column flex">
            333
            @include('cash.elements.moneymove_list_container')
        </div>
    </div>
@endsection

