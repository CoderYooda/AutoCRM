{{--@extends('product.layout.tabs')--}}

@extends(request()->view_as == 'json' && request()->target == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.store.layout.tabs')

@section('title', $page ?? 'Статистика')

@section('content')
    @php $class = 'statistic' @endphp

    <div id="ajax-table-statistic" class="bottom-container d-flex">
        <form method="GET" action="{{ route('StatisticShow') }}">
            <div class="bottom-container">
                <div class="box-lister">

                    <div class="statistic-row row-sm mt-0">

                        <div class="box">
                            <div class="statistic-info">
                                <img title="Выберите фильтры для формирования статистики" src="{{ asset('images/icons/statistic-question.svg') }}"  alt=""/>
                            </div>
                        </div>

                        <div onclick="{{ $class }}.toggleFilters(this)" class="statistic-select-all pointer">
                            <div class="box mr-15">
                            <div>
                                <label class="ui-switch orange mt-1">
                                    <input id="select_all" type="checkbox" value="off"><i></i>
                                </label>
                            </div>
                            <div>Выбрать все</div>
                            </div>
                        </div>

                    </div>

                    <div class="statistic-row row-sm">

                        @foreach($sorts as $sort)

                            <div onclick="{{ $class }}.toggleFilter(this)" class="statistic-filter mb-15 pointer">

                                <div class="box mr-15" style="height: 146px;">

                                    <div class="statistic-title">{{ $sort['name'] }}</div>

                                    @if(isset($list[$sort['name']]))
                                        <div class="statistic-summ" style="color: {{ $sort['color']}}">{{ collect($list[$sort['name']])->has('amount') ? collect($list[$sort['name']])->sum('amount') : collect($list[$sort['name']])->sum() }} ₽</div>
                                    @else
                                        <div class="statistic-summ">0 ₽</div>
                                    @endif

                                    <div class="statistic-checkbox">
                                            <span class="float-right ml-2" style="line-height: 0;">
                                                <label style="background: {{ $sort['color'] }}" class="ui-switch orange mt-1">
                                                    <input name="entities[]" id="{{ $sort['field_name'] }}" type="checkbox" value="{{ $sort['name'] }}"><i></i>
                                                </label>
                                            </span>
                                    </div>

                                    <div class="statistic-question">
                                        <img title="{{ $sort['desc'] }}" src="{{ asset('images/icons/statistic-question.svg') }}"  alt=""/>
                                    </div>

                                </div>

                            </div>

                        @endforeach

                    </div>

                </div>
                <div class="content-rightside">

                    <div class="d-flex">

                        <div class="box mb-15">
                            <div class="p-15 w-290 pr-0" style="position: relative">
                                <div class="form-group w-100 mb-10 pr-15">
                                    <label>Дата начала</label>
                                    <button type="button" onclick="{{ $class }}.resetBeginDate()" class="right-remove"><i class="fa fa-remove"></i></button>
                                    <input onclick="this.select();" type="text" name="begin_date" class="form-control date_picker_start flatpickr-input"
                                           placeholder="Выберите дату">
                                </div>

                                <div class="form-group w-100 mb-10 pr-15">
                                    <label>Дата конца</label>
                                    <button type="button" onclick="{{ $class }}.resetFinalDate()" class="right-remove"><i class="fa fa-remove"></i></button>
                                    <input onclick="this.select();" type="text" name="final_date" class="form-control date_picker_end flatpickr-input"
                                           placeholder="Выберите дату">
                                </div>

                                <div class="form-group w-100 mb-10 pr-15">
                                    <label>Менеджер</label>
                                    <button type="button" onclick="{{ $class }}.clearManager()" class="right-remove"><i class="fa fa-remove"></i></button>
                                    <button onclick="{{ $class }}.openSelectManagerModal()" type="button"
                                            class="partner_select form-control text-left button_select">
                                        <div id="manager_name">Не выбрано</div>
                                    </button>
                                </div>

                                <div class="form-group w-100 mb-10 pr-15">
                                    <label>Контрагент</label>
                                    <button type="button" onclick="{{ $class }}.clearPartner()" class="right-remove"><i class="fa fa-remove"></i></button>
                                    <button onclick="{{ $class }}.openSelectPartnerModal()" type="button"
                                            class="partner_select form-control text-left button_select">
                                        <div id="partner_name">Не выбрано</div>
                                    </button>
                                </div>

                                <div class="form-group w-100 mb-10 pr-15">
                                    <label>Статья ДДС</label>
                                    <button type="button" onclick="{{ $class }}.clearDdsarticle()" class="right-remove"><i class="fa fa-remove"></i></button>
                                    <button onclick="window.openDialog('selectDdsarticle', '&refer={{ $class }}');" type="button"
                                            class="partner_select form-control text-left button_select">
                                        <div id="dds_name">Не выбрано</div>
                                    </button>
                                </div>

                                <div class="form-group w-100 mb-10 pr-15 mb-0">
                                    <button class="button primary mt-5">Показать</button>
                                    {{--                                <button class=" button primary mt-30" onclick="statistic.print()">Печать</button>--}}
                                </div>

                                <input type="hidden" name="manager_id"/>
                                <input type="hidden" name="partner_id"/>
                                <input type="hidden" name="dds_id"/>

                            </div>
                        </div>
                    </div>

                    <div class="ml-15">
                        <div class="filter-title">Выбранный результат</div>
                        <div class="filter-list">

                        </div>
                    </div>

                </div>
            </div>
        </form>
    </div>
@endsection
