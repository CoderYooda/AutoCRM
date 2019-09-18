@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'layouts.TabXHR' : 'cash.layout.tabs')

@section('tab')
    <div class="d-flex flex-column flex">
        <div class="navbar white no-radius box-shadow pos-rlt">
            <div class="d-flex flex-row flex">
                <div class="input-group mr-2"  style="width: 200px;">
                    <input id="search" type="text" name="search" value="{{ request('search') }}" class="form-control form-control-sm search" placeholder="Поиск по складу">
                </div>
                <div class="input-group mr-2"  style="width: 200px;">
                    <input id="warrant_date_start" type="text" name="warrant_date_start" value="{{ request('dates_range') }}" class="form-control form-control-sm warrant_date_start fake-disabled" placeholder="Даты">
                    <div class="input-group-append">
                        <button type="button" onclick="window.cash.resetDate()" class="btn btn-sm white"><i class="fa fa-remove"></i></button>
                    </div>
                </div>
                <div class="input-group mr-2" style="width: 200px;">
                    <select id="warrant_isIncoming" name="warrant_isIncoming" class="form-control form-control-sm warrant_isIncoming">
                        <option value="null" @if($request['isIncoming'] === 'null') selected @endif >Все документы</option>
                        <option value="1" @if($request['isIncoming'] === '1') selected @endif >Приходные ордера</option>
                        <option value="0" @if($request['isIncoming'] === '0') selected @endif >Расходные ордера</option>
                    </select>
                </div>
            </div>
            <span class="m-b btn-groups pl-1">
                <button onclick="openDialog('warrantDialog', '&isIncoming=1')" class="btn btn-sm white mb-0">Новый приходный ордер</button>
                <button onclick="openDialog('warrantDialog', '&isIncoming=0')" class="btn btn-sm white mb-0">Новый расходный ордер</button>
            </span>
        </div>
        <div id="ajax-table-warrant" class="content-main d-flex flex-column flex">
            @include('cash.elements.warrant_list_container')
        </div>
    </div>
@endsection

