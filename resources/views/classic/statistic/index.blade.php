{{--@extends('product.layout.tabs')--}}

@extends(request()->view_as == 'json' && request()->target == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.store.layout.tabs')

@section('title', $page ?? 'Статистика')

@section('content')
    @php $class = 'statistic' @endphp

    <div id="ajax-table-statistic" class="bottom-container d-flex">
        <form method="GET" action="{{ route('StatisticShow') }}">
        <div class="flex-1">
            <div class="d-flex">

                <div class="statistic-row">

                    @foreach($sorts as $sort)
                        <div class="statistic-filter box mr-16 mb-16" style="height: 146px;">

                                <div class="statistic-title">{{ $sort['name'] }}</div>
                                <div class="statistic-summ">₽ 10,000</div>
                                <div class="statistic-checkbox">
                                    <span class="float-right ml-2" style="line-height: 0;">
                                        <label style="background: {{ $sort['color'] }}" class="ui-switch orange mt-1">
                                            <input name="entities[{{ $sort['name'] }}]" id="{{ $sort['field_name'] }}" type="checkbox" checked><i></i>
                                        </label>
                                    </span>
                                </div>
                                <div class="statistic-question">
                                    <img title="{{ $sort['desc'] }}" src="{{ asset('images/icons/statistic-question.svg') }}"  alt=""/>
                                </div>

                        </div>
                    @endforeach

                </div>

{{--                <div class="box mr-15 p-15" style="height: calc(100vh - 80px)!important; flex: 1.5!important;">--}}
{{--                    <canvas id="statistic-chart" ></canvas>--}}
{{--                </div>--}}
{{--                <div class="flex-1 box" >--}}
{{--                    <div data-simplebar style="max-height: calc(100vh - 80px);">--}}
{{--                        <div id="statistic-list" style="position: relative">--}}

{{--                        </div>--}}
{{--                    </div>--}}
{{--                </div>--}}
                <div class="content-rightside mt-16 mr-16 mb-0">

                    <div class="box mb-15">
                        <div class="p-16 w-290 pr-0" style="position: relative">
                            <div class="form-group w-100 mb-10 pr-16">
                                <label>Дата начала</label>
                                <button type="button" onclick="{{ $class }}.resetBeginDate()" class="right-remove"><i class="fa fa-remove"></i></button>
                                <input onclick="this.select();" type="text" name="begin_date" class="form-control date_picker_start flatpickr-input"
                                       placeholder="Выберите дату">
                            </div>

                            <div class="form-group w-100 mb-10 pr-16">
                                <label>Дата конца</label>
                                <button type="button" onclick="{{ $class }}.resetFinalDate()" class="right-remove"><i class="fa fa-remove"></i></button>
                                <input onclick="this.select();" type="text" name="final_date" class="form-control date_picker_end flatpickr-input"
                                       placeholder="Выберите дату">
                            </div>

                            <div class="form-group w-100 mb-10 pr-16">
                                <label>Менеджер</label>
                                <button type="button" onclick="{{ $class }}.clearManager()" class="right-remove"><i class="fa fa-remove"></i></button>
                                <button onclick="{{ $class }}.openSelectManagerModal()" type="button"
                                        class="partner_select form-control text-left button_select">
                                    <div id="manager_name">Не выбрано</div>
                                </button>
                            </div>

                            <div class="form-group w-100 mb-10 pr-16">
                                <label>Контрагент</label>
                                <button type="button" onclick="{{ $class }}.clearPartner()" class="right-remove"><i class="fa fa-remove"></i></button>
                                <button onclick="{{ $class }}.openSelectPartnerModal()" type="button"
                                        class="partner_select form-control text-left button_select">
                                    <div id="partner_name">Не выбрано</div>
                                </button>
                            </div>

                            <div class="form-group w-100 mb-10 pr-16">
                                <label>Статья ДДС</label>
                                <button type="button" onclick="{{ $class }}.clearDdsarticle()" class="right-remove"><i class="fa fa-remove"></i></button>
                                <button onclick="window.openDialog('selectDdsarticle', '&refer={{ $class }}');" type="button"
                                        class="partner_select form-control text-left button_select">
                                    <div id="dds_name">Не выбрано</div>
                                </button>
                            </div>

                            <div class="form-group w-100 mb-10 pr-16" style="margin-bottom: 0px !important;">
                                <button class="button primary mt-5">Показать</button>
{{--                                <button class=" button primary mt-30" onclick="statistic.print()">Печать</button>--}}
                            </div>

                            <input type="hidden" name="manager_id"/>
                            <input type="hidden" name="partner_id"/>
                            <input type="hidden" name="dds_id"/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        </form>
    </div>
@endsection
