@extends($request['view_as'] == 'json' && $request['target'] != null ? get_template() . '.layouts.TabXHR' : get_template() . '.store.layout.tabs')

@section('tab')
    <div id="ajax-table-provider_orders" class="bottom-container" style="height: calc(100% - 79px)!important;">
        <div class="box-lister" style="width: 1px!important;">
            <div class="w-100 box box-search mb-15">
                <input id="search" name="search" placeholder="Поиск по контактам" class="input w-100" value="{{ request('search') }}" type="text">
                <span class="input-group-append" data-toggle="tooltip" data-placement="top" title="Очистить поиск">
                    <button class="btn_clean" onclick="window.store.cleanSearch()"></button>
                </span>
            </div>
            <div id="table-container" class="box box-content">
                <div id="provider_orders-table" ></div>
            </div>
        </div>
        <div class="content-rightside">
            @can('Создавать заявки поставщикам')
                <button onclick="openDialog('providerorderDialog')" class="button primary mb-15 w-100">Создать заявку</button>
            @endcan
            <div class="box w-290 p-15 filter-panel">
                <div class="box-title">Фильтр</div>
                <div class="form-group d-flex mb-10">
                    <label class="no-wrap" for="date_filter">Период</label>
                    <input id="date_filter" type="text" name="date_filter" value="{{ request('dates_range') }}" class="form-control date_filter input_as_link" placeholder="за всё время">
                    <button type="button" onclick="window.store.resetDate()" class="right-remove"><i class="fa fa-remove"></i></button>
                </div>
                <div class="form-group d-flex mb-10">
                    <label class="no-wrap" for="pay_status">Статус оплаты</label>
                    <div class="dropdown" onclick="window.helper.openModal(this, event)">
                        <input id="pay_status" type="text" name="pay_status" value="{{ request('pay_status') }}" class="form-control pay_status input_as_link" placeholder="не выбрано" disabled>
                        <div class="dropdown_container">
                            <div class="arrow"></div>
                            <span onclick="store.setField('pay_status', null, 'не выбрано', this)" class="element">Не выбрано</span>
                            <span onclick="store.setField('pay_status', 2, 'оплачено', this)" class="element">Оплачено</span>
                            <span onclick="store.setField('pay_status', 0, 'не оплачено', this)" class="element">Не оплачено</span>
                            <span onclick="store.setField('pay_status', 1, 'оплачено частично', this)" class="element">Оплачено частично</span>
                            <span onclick="store.setField('pay_status', 3, 'переплачено', this)" class="element">Переплачено</span>
                        </div>
                    </div>
                    <button type="button" onclick="store.setField('pay_status', null, 'не выбрано')" class="right-remove"><i class="fa fa-remove"></i></button>
                </div>
                <div class="form-group d-flex mb-10">
                    <label class="no-wrap" for="entrance_status">Статус поступления</label>
                    <div class="dropdown" onclick="window.helper.openModal(this, event)">
                        <input readonly id="entrance_status" type="text" name="entrance_status" value="{{ request('pay_status') }}" class="form-control entrance_status input_as_link" placeholder="не выбрано" disabled>
                        <div class="dropdown_container">
                            <div class="arrow"></div>
                            <span onclick="store.setField('entrance_status', null, 'не выбрано', this)" class="element">не выбрано</span>
                            <span onclick="store.setField('entrance_status', 1, 'частично', this)" class="element">частично</span>
                            <span onclick="store.setField('entrance_status', 2, 'полностью', this)" class="element">полностью</span>
                            <span onclick="store.setField('entrance_status', 0, 'без поступлений', this)" class="element">без поступлений</span>
                        </div>
                    </div>
                    <button type="button" onclick="store.setField('entrance_status', null, 'не выбрано')" class="right-remove"><i class="fa fa-remove"></i></button>
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
                    <div class="form-group d-flex mb-10">
                        <label class="no-wrap" for="accountable">Ответственный</label>
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
