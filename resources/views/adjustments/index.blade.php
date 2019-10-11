@extends($request['view_as'] == 'json' && $request['target'] != null ? 'layouts.TabXHR' : 'store.layout.tabs')

@section('tab')
    <div class="d-flex flex-column flex">
        <div class="navbar white no-radius box-shadow pos-rlt">
            <div class="d-flex flex-row flex">
                <div class="input-group mr-2"  style="width: 200px;">
                    <input id="search" type="text" name="search" value="{{ request('search') }}" class="form-control form-control-sm search" placeholder="Поиск по контрагенту">
                    <div class="input-group-append">
                        <button type="button" onclick="window.store.resetSearch()" class="btn btn-sm white"><i class="fa fa-remove"></i></button>
                    </div>
                </div>
                <div class="input-group mr-2"  style="width: 200px;">
                    <input id="shipment_date_start" type="text" name="shipment_date_start" value="{{ request('dates_range') }}" class="form-control form-control-sm shipment_date_start fake-disabled" placeholder="Даты">
                    <div class="input-group-append">
                        <button type="button" onclick="window.store.resetDate()" class="btn btn-sm white"><i class="fa fa-remove"></i></button>
                    </div>
                </div>
            </div>
            <span class="m-b btn-groups pl-1">
                <button onclick="openDialog('adjustmentDialog')" class="btn btn-sm white mb-0">Создать корректировку</button>
            </span>
        </div>
        <div id="ajax-table-adjustmets" class="content-main d-flex flex-column flex white">
            @include('provider_orders.elements.list_container')
        </div>
    </div>
@endsection
