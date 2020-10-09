@extends($request['view_as'] == 'json' && $request['target'] != null ? get_template() . '.layouts.TabXHR' : get_template() . '.store.layout.tabs')

@section('tab')
    <div id="ajax-table-refund" class="bottom-container full-box-cont">
        <div class="box-lister box w-px">
            <div id="table-container" class="box-content">
                <div id="refundTable"></div>
            </div>
        </div>
        <div class="content-rightside">
            {{--@can('Создавать заказ клиента')--}}
                <button onclick="openDialog('refundDialog')" class="button primary mb-15 w-100">Новый возврат</button>
            {{--@endcan--}}
            <div class="box w-290 p-15 filter-panel">
                <div class="box-title">Фильтр</div>
                {{--<div class="form-group d-flex mb-10">--}}
                    {{--<label class="no-wrap" for="entrance_status">Статус заказа</label>--}}
                    {{--<div class="dropdown" onclick="window.helper.openModal(this, event)">--}}
                        {{--<input readonly id="clientorder_status" type="text" name="entrance_status" value="{{ request('pay_status') }}" class="form-control entrance_status input_as_link" placeholder="не выбрано" disabled>--}}
                        {{--<div class="dropdown_container">--}}
                            {{--<div class="arrow"></div>--}}
                            {{--<span onclick="store.setField('clientorder_status', null, 'не выбрано', this)" class="element">Не выбрано</span>--}}
                            {{--<span onclick="store.setField('clientorder_status', 'active', 'Активен', this)" class="element">Активен</span>--}}
                            {{--<span onclick="store.setField('clientorder_status', 'canceled', 'Отменен', this)" class="element">Отменен</span>--}}
                            {{--<span onclick="store.setField('clientorder_status', 'full', 'Укомплектован', this)" class="element">Укомплектован</span>--}}
                            {{--<span onclick="store.setField('clientorder_status', 'complete', 'Выполнен', this)" class="element">Выполнен</span>--}}
                        {{--</div>--}}
                    {{--</div>--}}
                    {{--<button type="button" onclick="store.setField('clientorder_status', null, 'не выбрано')" class="right-remove"><i class="fa fa-remove"></i></button>--}}
                {{--</div>--}}
                <div class="form-group d-flex mb-10">
                    <label class="no-wrap" for="date_filter">Период</label>
                    <input id="date_filter" type="text" name="date_filter" value="{{ request('dates_range') }}" class="form-control date_filter input_as_link" placeholder="за всё время">
                    <button type="button" onclick="window.store.resetDate()" class="right-remove"><i class="fa fa-remove"></i></button>
                </div>
                <div class="filter_field mb-10">
                    <div class="form-group d-flex mb-10">
                        <label class="no-wrap" for="provider">Покупатель</label>
                        <input readonly onclick="store.openSelectPartnerModal('client')" id="provider" type="text" name="provider" value="{{ request('pay_status') }}" class="form-control provider input_as_link" placeholder="выбрать">
                        <button type="button" onclick="store.clearList('client', 'client_stack')" class="right-remove"><i class="fa fa-remove"></i></button>
                    </div>
                    <div id="client_stack"></div>
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
