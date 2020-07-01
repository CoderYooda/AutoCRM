@extends($request['view_as'] == 'json' && $request['target'] != null ? env('DEFAULT_THEME', 'classic') . '.layouts.TabXHR' : env('DEFAULT_THEME', 'classic') . '.store.layout.tabs')

@section('tab')
    {{--<div class="d-flex flex-column flex">--}}
        {{--<div class="navbar white no-radius box-shadow pos-rlt">--}}
            {{--<div class="d-flex flex-row flex">--}}
                {{--<div class="input-group mr-2"  style="width: 200px;">--}}
                    {{--<input id="search" type="text" name="search" value="{{ request('search') }}" class="form-control form-control-sm search" placeholder="Поиск по контакту">--}}
                    {{--<div class="input-group-append">--}}
                        {{--<button type="button" onclick="window.store.resetSearch()" class="btn btn-sm white"><i class="fa fa-remove"></i></button>--}}
                    {{--</div>--}}
                {{--</div>--}}
                {{--<div class="input-group mr-2"  style="width: 200px;">--}}
                    {{--<input id="shipment_date_start" type="text" name="shipment_date_start" value="{{ request('dates_range') }}" class="form-control form-control-sm shipment_date_start fake-disabled" placeholder="Даты">--}}
                    {{--<div class="input-group-append">--}}
                        {{--<button type="button" onclick="window.store.resetDate()" class="btn btn-sm white"><i class="fa fa-remove"></i></button>--}}
                    {{--</div>--}}
                {{--</div>--}}
            {{--</div>--}}
            {{--<span class="m-b btn-groups pl-1">--}}
                {{--<button onclick="openDialog('adjustmentDialog')" class="btn btn-sm white mb-0">Создать корректировку</button>--}}
            {{--</span>--}}
        {{--</div>--}}
        {{--<div id="ajax-table-adjustment" class="content-main d-flex flex-column flex white">--}}
            {{--<div class="box-lister box">--}}
                {{--<div id="table-container" class="box-content">--}}
                    {{--<div id="adjustment-table"></div>--}}
                {{--</div>--}}
            {{--</div>--}}
        {{--</div>--}}
    {{--</div>--}}
    <div class="top-container">
        <div class="search-panel box">
            <div class="search-field-container w-100">
                <div>
                    <input id="shipment_date_start" type="text" name="shipment_date_start" value="{{ request('dates_range') }}" class="form-control form-control-sm shipment_date_start fake-disabled" placeholder="Даты">
                    <div class="input-group-append">
                        <button type="button" onclick="window.store.resetDate()" class="btn btn-sm white"><i class="fa fa-remove"></i></button>
                    </div>
                </div>
                <input id="search" name="search" placeholder="Поиск по контакту" class="input w-100" value="{{ request('search') }}" type="text">
            </div>
            <div class="actions">
                <button onclick="openDialog('shipmentDialog')" class="button primary">Новая продажа</button>
            </div>
        </div>
    </div>
    <div id="ajax-table-adjustment" class="bottom-container">
        <div class="box-lister box">
            <div id="table-container" class="box-content">
                <div id="adjustment-table"></div>
            </div>
        </div>
    </div>
@endsection
