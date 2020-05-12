{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.store.layout.tabs')

@section('title', $page ?? 'Статистика')

@section('content')
    @php $class = 'statistic' @endphp

    <div id="ajax-table-statistic" class="bottom-container d-flex p-15">
        <div class="box flex-1">

            <div class="d-flex">
                <div class="form-group w-128 mr-15">
                    <label>Дата начала</label>
                    <input type="date" type="text" name="begin_date" class="form-control date_picker_start"
                           placeholder="Выберите дату">
                </div>

                <div class="form-group w-128 mr-15">
                    <label>Дата конца</label>
                    <input type="date" type="text" name="final_date" class="form-control date_picker_end"
                           placeholder="Выберите дату">
                </div>

                <div class="form-group w-128 mr-15">
                    <label>Сущность</label>
                    <select id="entity" class="form-control">
                        <option value="0">Заявки поставщикам</option>
                        <option value="1">Поступления</option>
                        <option value="2">Возвраты</option>
                        <option value="3">Продажи</option>
                    </select>
                </div>

                <div class="form-group w-128 mr-15">
                    <label>Менеджер</label>
                    <button onclick="{{ $class }}.openSelectManagerModal()" type="button"
                            class="partner_select form-control text-left button_select">
                        <div id="manager_name">Не выбрано</div>
                    </button>
                </div>

                <div class="form-group w-128 mr-15">
                    <label>Партнёр</label>
                    <button onclick="{{ $class }}.openSelectPartnerModal()" type="button"
                            class="partner_select form-control text-left button_select">
                        <div id="partner_name">Не выбрано</div>
                    </button>
                </div>

                <input type="hidden" name="manager_id"/>
                <input type="hidden" name="partner_id"/>

                <div class="form-group w-128 mr-15">
                    <button class="button primary mt-30" onclick="{{ $class }}.showResults()">Показать</button>
                </div>
            </div>

            <div class="d-flex">
                <div class="flex-1">
                    <canvas id="statistic-chart" style="max-width: 600px; max-height: 400px;"></canvas>
                </div>
                <div class="flex-1">
                    Описание выводимой статистики
                </div>
            </div>
            <div class="d-flex">
                <div class="flex-1">
                    <ul class="nav select-list-modal">
                        <li>
                            Элемент спмска сущности
                        </li>
                        <li>
                            Элемент спмска сущности
                        </li>
                        <li>
                            Элемент спмска сущности
                        </li>
                        <li>
                            Элемент спмска сущности
                        </li>
                    </ul>
                </div>
            </div>

        </div>


    </div>
@endsection