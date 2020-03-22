@extends($request['view_as'] == 'json' ? env('DEFAULT_THEME', 'classic') . '.layouts.XHR' : env('DEFAULT_THEME', 'classic') . '.layouts.main')

@section('content')
    <div id="ajax-table-provider_orders" class="bottom-container">
        <div class="content-menu box w-290">
            <div id="t2able-container" class="box-content">
                <div class="search-panel">
                    <div class="w-100 box box-search">
                        <input id="actions_search" name="search" placeholder="Поиск по контрагентам" class="input w-100" value="" type="text">
                        <span class="input-group-append" data-toggle="tooltip" data-placement="top" title="Очистить поиск">
                            <button class="btn_clean" onclick="window.actions.cleanSearch()"></button>
                        </span>
                    </div>
                </div>
                <ul id="members-container" class="nav select-list-modal">
                    @include(env('DEFAULT_THEME', 'classic') . '.history.users')
                </ul>
            </div>
        </div>
        <div class="box-lister box">
            <div id="actions-container" class="box-content">
                @include(env('DEFAULT_THEME', 'classic') . '.history.actions')
            </div>
        </div>
        <div class="box-lister box ml-0">
            <div id="system_messages-container" class="box-content">
                @include(env('DEFAULT_THEME', 'classic') . '.history.system_messages')
            </div>
        </div>
        <div class="content-rightside">
            {{--<button onclick="openDialog('entranceDialog')" class="button primary mb-15 w-100">Оформить поступление</button>--}}
            <div class="box w-290 p-15 filter-panel">
                <div class="box-title">Фильтр</div>
                <div class="form-group d-flex mb-10">
                    <label class="no-wrap" for="date_filter">Период</label>
                    <input id="date_filter" type="text" name="date_filter" value="{{ request('dates_range') }}" class="form-control date_filter input_as_link" placeholder="за всё время">
                    <button type="button" onclick="window.actions.resetDate()" class="right-remove"><i class="fa fa-remove"></i></button>
                </div>
                <div class="form-group d-flex mb-10">
                    <label class="no-wrap" for="pay_status">Тип записи</label>
                    <div class="dropdown" onclick="window.helper.openModal(this, event)">
                        <input id="type" type="text" name="type" value="{{ request('type') }}" class="form-control type input_as_link" placeholder="не выбрано" disabled>
                        <div class="dropdown_container">
                            <div class="arrow"></div>
                            <span onclick="actions.setField('type', null, 'не выбрано', this)" class="element">Не выбрано</span>
                            <span onclick="actions.setField('type', 'Store', 'Товары', this)" class="element">Товары</span>
                            <span onclick="actions.setField('type', 'ProviderOrder', 'Заявки поставщикам', this)" class="element">Заявки поставщикам</span>
                            <span onclick="actions.setField('type', 'Entrance', 'Поступления', this)" class="element">Поступления</span>
                            <span onclick="actions.setField('type', 'Shipment', 'Продажи', this)" class="element">Продажи</span>
                            <span onclick="actions.setField('type', 'ClientOrder', 'Заказы клиентов', this)" class="element">Заказы клиентов</span>
                            <span onclick="actions.setField('type', 'Adjustment', 'Корректировки', this)" class="element">Корректировки</span>
                            <span onclick="actions.setField('type', 'Warrant', 'Ордера', this)" class="element">Ордера</span>
                            <span onclick="actions.setField('type', 'MoneyMove', 'Перемещения', this)" class="element">Перемещения</span>
                            <span onclick="actions.setField('type', 'Partner', 'Контрагенты', this)" class="element">Контрагенты</span>
                        </div>
                    </div>
                    <button type="button" onclick="actions.setField('type', null, 'не выбрано')" class="right-remove"><i class="fa fa-remove"></i></button>
                </div>
                {{--<hr>--}}
                {{--<div class="box-title">Контактная информация</div>--}}
                {{--<div id="contact_block"></div>--}}
                {{--<hr>--}}
                {{--<div class="box-title">Комментарий</div>--}}
                {{--<div id="comment_block"></div>--}}
            </div>
        </div>
    </div>
@endsection
