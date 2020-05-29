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
                    <label class="no-wrap" for="sections">Разделы</label>
                    <input id="sections" type="text" class="form-control" />
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
