@extends($request['view_as'] == 'json' && $request['target'] != null ? env('DEFAULT_THEME', 'classic') . '.layouts.TabXHR' : env('DEFAULT_THEME', 'classic') . '.store.layout.tabs')

@section('tab')
    {{--<div class="top-container">--}}
        {{--<div class="search-panel box">--}}
            {{--<div class="search-field-container w-100">--}}
                {{--<input id="search" name="search" placeholder="Поиск по контрагенту" class="input w-100" value="{{ request('search') }}" type="text">--}}
            {{--</div>--}}
            {{--<div class="actions">--}}
                {{--<button onclick="openDialog('providerorderDialog')" class="button primary">Новыая заявка поставщику</button>--}}
            {{--</div>--}}
        {{--</div>--}}
    {{--</div>--}}
    <div id="ajax-table-provider_orders" class="bottom-container">
        <div class="box-lister box">
            <div id="table-container" class="box-content">
                <div id="provider_orders-table" ></div>
            </div>
        </div>
        <div class="content-rightside">
            <button onclick="openDialog('providerorderDialog')" class="button primary mb-15 w-100">Создать заявку</button>
            <div class="box w-290 p-15 filter-panel">
                <div class="form-group d-flex">
                    <label class="no-wrap" for="date_filter">Период</label>
                    <input id="date_filter" type="text" name="date_filter" value="{{ request('dates_range') }}" class="form-control date_filter input_as_link" placeholder="за всё время">
                    <button type="button" onclick="window.store.resetDate()" class="right-remove"><i class="fa fa-remove"></i></button>
                </div>
                <div class="form-group d-flex">
                    <label class="no-wrap" for="pay_status">Статус оплаты</label>
                    <div class="dropdown" onclick="window.helper.openModal(this)">
                        <input id="pay_status" type="text" name="pay_status" value="{{ request('pay_status') }}" class="form-control pay_status input_as_link" placeholder="не выбрано">
                        <div class="dropdown_container">
                            <div class="arrow"></div>
                            <span class="element">1</span>
                            <span class="element">2</span>
                            <span class="element">3</span>
                            <span class="element">4</span>
                        </div>
                    </div>
                    <button type="button" onclick="" class="right-remove"><i class="fa fa-remove"></i></button>
                </div>
                <div class="form-group d-flex">
                    <label class="no-wrap" for="entrance_status">Статус поступления</label>
                    <input id="entrance_status" type="text" name="entrance_status" value="{{ request('pay_status') }}" class="form-control entrance_status input_as_link" placeholder="не выбрано">
                    <button type="button" onclick="" class="right-remove"><i class="fa fa-remove"></i></button>
                </div>
                <div class="form-group d-flex">
                    <label class="no-wrap" for="provider">Поставщик</label>
                    <input id="provider" type="text" name="provider" value="{{ request('pay_status') }}" class="form-control provider input_as_link" placeholder="не выбрано">
                    <button type="button" onclick="" class="right-remove"><i class="fa fa-remove"></i></button>
                </div>
                <div class="form-group d-flex">
                    <label class="no-wrap" for="accountable">Ответственный</label>
                    <input onclick="store.openSelectPartnermodal()" id="accountable" type="text" name="accountable" value="{{ request('pay_status') }}" class="form-control accountable input_as_link" placeholder="не выбрано">
                    <button type="button" onclick="" class="right-remove"><i class="fa fa-remove"></i></button>
                </div>
            </div>
        </div>
    </div>
@endsection
