{{--@extends('product.layout.tabs')--}}

@extends(request()->view_as == 'json' && request()->target == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.store.layout.tabs')

@section('title', $page ?? 'Статистика')

@section('content')
    @php $class = 'statistic' @endphp

    <div id="ajax-table-statistic" class="bottom-container d-flex p-15">
        <div class="flex-1">
            <div class="d-flex box p-15">
                <div class="form-group w-128 mr-15 mb-0">
                    <label>Дата начала</label>
                    <input onclick="this.select();" type="text" name="begin_date" class="form-control date_picker_start flatpickr-input"
                           placeholder="Выберите дату">
                </div>

                <div class="form-group w-128 mr-15 mb-0">
                    <label>Дата конца</label>
                    <input onclick="this.select();" type="text" name="final_date" class="form-control date_picker_end flatpickr-input"
                           placeholder="Выберите дату">
                </div>

                <div class="form-group w-128 mr-15 mb-0">
                    <label>Разделы</label>

                    <div class="dropdown" onclick="window.helper.openModal(this, event)">
                        <input readonly id="entity_name" type="text" class="form-control entrance_status" value="Не выбрано" disabled>
                        <input type="hidden" id="entity_id" value="-1" />
                        <div class="dropdown_container">
                            <div class="arrow"></div>
                            <span onclick="{{ $class }}.setEntity(-1)" class="element">Все разделы</span>
                            <span onclick="{{ $class }}.setEntity(0)" class="element">Заявки поставщикам</span>
                            <span onclick="{{ $class }}.setEntity(1)" class="element">Поступления</span>
                            <span onclick="{{ $class }}.setEntity(2)" class="element">Возвраты</span>
                            <span onclick="{{ $class }}.setEntity(3)" class="element">Продажи</span>
                            <span onclick="{{ $class }}.setEntity(4)" class="element">Заказы клиентов</span>
                            <span onclick="{{ $class }}.setEntity(5)" class="element">Приходные ордера</span>
                            <span onclick="{{ $class }}.setEntity(6)" class="element">Расходные ордера</span>
                            <span onclick="{{ $class }}.setEntity(7)" class="element">Перемещения</span>
                        </div>
                    </div>
                </div>

                <div class="form-group w-128 mr-15 mb-0">
                    <label>Менеджер</label>
                    <button onclick="{{ $class }}.openSelectManagerModal()" type="button"
                            class="partner_select form-control text-left button_select">
                        <div id="manager_name">Не выбрано</div>
                    </button>
                </div>

                <div class="form-group w-128 mr-15 mb-0">
                    <label>Контрагент</label>
                    <button onclick="{{ $class }}.openSelectPartnerModal()" type="button"
                            class="partner_select form-control text-left button_select">
                        <div id="partner_name">Не выбрано</div>
                    </button>
                </div>

                <input type="hidden" name="manager_id"/>
                <input type="hidden" name="partner_id"/>

                <div class="form-group w-128 mr-15 mb-0">
                    <button class="button primary mt-30" onclick="{{ $class }}.showResults()">Показать</button>
                </div>
            </div>

            <div class="d-flex mt-15">
                <div class="box mr-15 p-15" style="height: calc(100vh - 191px)!important; flex: 1.5!important;">
                    <canvas id="statistic-chart" ></canvas>
                </div>
                <div class="flex-1 box" >
                    <div data-simplebar style="max-height: calc(100vh - 191px);">
                        <div id="statistic-list" style="position: relative">
                            {{--<h2 class="mt-0 stat_header p-15">24</h2>--}}
                            {{--<table class="table w-100 p-15">--}}
                                {{--<thead>--}}
                                    {{--<th>ID</th>--}}
                                    {{--<th>Менеджер</th>--}}
                                    {{--<th>Контакт</th>--}}
                                    {{--<th>Сумма</th>--}}
                                    {{--<th>Дата</th>--}}
                                {{--</thead>--}}
                                {{--<tbody>--}}
                                    {{--<tr>--}}
                                        {{--<td>12344</td>--}}
                                        {{--<td>Сенаторов С.</td>--}}
                                        {{--<td>Валунов М.</td>--}}
                                        {{--<td>3 200</td>--}}
                                        {{--<td>21.01.2009</td>--}}
                                    {{--</tr>--}}
                                {{--</tbody>--}}
                            {{--</table>--}}
                        </div>
                    </div>
                </div>
                <div class="content-rightside mt-0 mr-0 ml-15 mb-0">
                    <div id="desc" class="box w-290 filter-panel h-100">

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
