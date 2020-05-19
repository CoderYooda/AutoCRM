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
                    <input type="date" type="text" name="begin_date" class="form-control date_picker_start"
                           placeholder="Выберите дату">
                </div>

                <div class="form-group w-128 mr-15 mb-0">
                    <label>Дата конца</label>
                    <input type="date" type="text" name="final_date" class="form-control date_picker_end"
                           placeholder="Выберите дату">
                </div>

                <div class="form-group w-128 mr-15 mb-0">
                    <label>Разделы</label>
                    <select id="entity" class="form-control">
                        <option value="-1">Все разделы</option>
                        <option value="0">Заявки поставщикам</option>
                        <option value="1">Поступления</option>
                        <option value="2">Возвраты</option>
                        <option value="3">Продажи</option>
                        <option value="4">Заказы клиентов</option>
                        <option value="5">Приходные ордеры</option>
                        <option value="6">Расходные ордеры</option>
                        <option value="7">Перемещения</option>
                    </select>
                </div>

                <div class="form-group w-128 mr-15 mb-0">
                    <label>Менеджер</label>
                    <button onclick="{{ $class }}.openSelectManagerModal()" type="button"
                            class="partner_select form-control text-left button_select">
                        <div id="manager_name">Не выбрано</div>
                    </button>
                </div>

                <div class="form-group w-128 mr-15 mb-0">
                    <label>Партнёр</label>
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
                <div id="desc" class="flex-1 box mr-15">

                </div>
                <div class="flex-1 box" >
                    <div data-simplebar style="max-height: calc(100vh - 191px);">
                        <div id="statistic-list">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
