@extends($request['view_as'] == 'json' ? 'layouts.XHR' : 'layouts.main')

@section('title', $page ?? 'Планировщик')

@section('content')
    <div id="schedule_index_page" class="d-flex flex">
        <div id="ajax-tab-content" class="d-flex flex">
            <div class="fade aside aside-sm b-r" id="content-aside">
                <div class="modal-dialog d-flex flex-column w-md light white lt">
                    <div class="navbar no-radius pos-rlt">
                        <span class="text-md">Планировщик</span>
                    </div>
                    <div class="">
                        <div class="">
                            <span class="list-item">
                                <div class="list-body">
                                    <span href="#" class="_500 pt-2">Заказы клиентов</span>
                                    <span class="float-right ml-2" style="line-height: 0;">
                                        <label class="ui-switch orange mt-1">
                                            <input type="checkbox" onchange="calendar.toggleSource(this)" data-source="clientOrderSource">
                                            <i></i>
                                        </label>
                                    </span>
                                </div>
                            </span>
                            <span class="list-item">
                                <div class="list-body">
                                    <span href="#" class="_500">Приходные ордера</span>
                                    <span class="float-right ml-2" style="line-height: 0;">
                                        <label class="ui-switch success mt-1">
                                            <input type="checkbox" onchange="calendar.toggleSource(this)" data-source="incomingWarrantSource">
                                            <i></i>
                                        </label>
                                    </span>
                                </div>
                            </span>
                            <span class="list-item">
                                <div class="list-body">
                                    <span href="#" class="_500">Расходные ордера</span>
                                    <span class="float-right ml-2" style="line-height: 0;">
                                        <label class="ui-switch light-blue mt-1">
                                            <input type="checkbox" onchange="calendar.toggleSource(this)" data-source="outcomingWarrantSource">
                                            <i></i>
                                        </label>
                                    </span>
                                </div>
                            </span>
                            <span class="list-item">
                                <div class="list-body">
                                    <span href="#" class="_500">Поступления товаров</span>
                                    <span class="float-right ml-2" style="line-height: 0;">
                                        <label class="ui-switch cyan mt-1">
                                            <input type="checkbox" onchange="calendar.toggleSource(this)" data-source="entranceSource">
                                            <i></i>
                                        </label>
                                    </span>
                                </div>
                            </span>
                            <span class="list-item">
                                <div class="list-body">
                                    <span href="#" class="_500">Продажи</span>
                                    <span class="float-right ml-2" style="line-height: 0;">
                                        <label class="ui-switch green mt-1">
                                            <input type="checkbox" onchange="calendar.toggleSource(this)" data-source="shipmentSource">
                                            <i></i>
                                        </label>
                                    </span>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex flex" id="content-body">
                <div class="d-flex flex-column flex">
                    <div class="d-flex flex">
                        <div id="ajax-table-calendar" class="d-flex flex-column flex white lt">
                            <div id="dates" style="margin: 0 -1px;">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

