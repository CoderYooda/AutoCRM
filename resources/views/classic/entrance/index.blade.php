@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? get_template() . '.layouts.TabXHR' : get_template() . '.store.layout.tabs')

@section('tab')
    <div id="ajax-table-entrance" class="bottom-container full-box-cont">
        <div class="box-lister box w-px">
            <div id="table-container" class="box-content">
                <div data-data="{{ $data }}" id="entranceTable" ></div>
            </div>
        </div>
        <div class="content-rightside">
            @can('Создавать поступления')
                <button onclick="openDialog('entranceDialog')" class="button primary mb-15 w-100">Оформить поступление</button>
            @endcan
            <div class="box w-290 p-15 filter-panel">
                <div class="box-title">Фильтр</div>
                <div class="form-group d-flex mb-10">
                    <label class="no-wrap" for="date_filter">Период</label>
                    <input id="date_filter" type="text" name="date_filter" value="{{ request('dates_range') }}" class="form-control date_filter input_as_link" placeholder="за всё время">
                    <button type="button" onclick="window.store.resetDate()" class="right-remove"><i class="fa fa-remove"></i></button>
                </div>
                <div class="filter_field mb-10">
                    <div class="form-group d-flex mb-10">
                        <label class="no-wrap" for="provider">Поставщик</label>
                        <input readonly onclick="store.openSelectPartnerModal('provider')" id="provider" type="text" name="provider" value="{{ request('pay_status') }}" class="form-control provider input_as_link" placeholder="выбрать">
                        <button type="button" onclick="store.clearList('provider', 'provider_stack')" class="right-remove"><i class="fa fa-remove"></i></button>
                    </div>
                    <div id="provider_stack"></div>
                </div>
                <div class="filter_field mb-10">
                    <div class="form-group d-flex">
                        <label class="no-wrap" for="accountable">Принимающий</label>
                        <input readonly onclick="store.openSelectPartnerModal('accountable')" id="accountable" type="text" name="accountable" value="{{ request('pay_status') }}" class="form-control accountable input_as_link" placeholder="выбрать">
                        <button type="button" onclick="store.clearList('accountable', 'accountable_stack')" class="right-remove"><i class="fa fa-remove"></i></button>
                    </div>
                    <div id="accountable_stack"></div>
                </div>
                <div id="adds-card" class="hide">
                    <hr>
                    <div class="box-title">Контактная информация</div>
                    <div id="contact_block"></div>
                    <hr>
                    <div class="box-title">Комментарий</div>
                    <div id="comment_block"></div>
                </div>
            </div>
        </div>
    </div>
@endsection
