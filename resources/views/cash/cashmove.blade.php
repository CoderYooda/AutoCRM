@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'layouts.TabXHR' : 'cash.layout.tabs')

@section('tab')
    <div class="d-flex flex-column flex">
        <div class="navbar white no-radius box-shadow pos-rlt">
            <div class="d-flex flex-row flex">

            </div>
            <span class="m-b btn-groups pl-1">
            <button onclick="openDialog('moneymoveDialog')" class="btn btn-sm white mb-0">Переместить средства</button>
        </span>
        </div>
        <div id="ajax-table-warrant" class="d-flex flex-column flex">
            @include('cash.elements.moneymove_list_container')
        </div>
    </div>
@endsection

