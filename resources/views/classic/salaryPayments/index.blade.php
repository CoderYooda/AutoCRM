@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? get_template() . '.layouts.TabXHR' : get_template() . '.cash.layout.tabs')
@section('tab')
    <div data-data="{{ $data }}" id="ajax-table-salarypayments" class="bottom-container full-box-cont">
        <div class="box-lister box w-px">
            <div id="table-container" class="box-content">
                <div id="salaryPayments" >
                    {{--<div class="bbtable-container">--}}
                        {{--<div class="bbtable-header">--}}
                            {{--<div class="header-elem checkbox"><input type="checkbox"></div>--}}
                            {{--<div class="header-elem">--}}
                                {{--<div class="title">Модель</div>--}}
                                {{--<div class="arrow up active"></div>--}}
                            {{--</div>--}}
                            {{--<div class="header-elem">--}}
                                {{--<div class="title">Артикул</div>--}}
                                {{--<div class="arrow down active"></div>--}}
                            {{--</div>--}}
                            {{--<div class="header-elem">--}}
                                {{--<div class="title">Производитель</div>--}}
                                {{--<div class="arrow up"></div>--}}
                            {{--</div>--}}
                            {{--<div class="header-elem">--}}
                                {{--<div class="title">Дата</div>--}}
                                {{--<div class="arrow up"></div>--}}
                            {{--</div>--}}
                        {{--</div>--}}

                        {{--<div class="bbtable-body">--}}
                            {{--@for($i = 10; $i > 0; $i--)--}}
                                {{--<div class="body-elem">--}}
                                    {{--<div class="cell checkbox"><input type="checkbox"></div>--}}
                                    {{--<div class="cell">--}}
                                        {{--<div class="title">--}}
                                            {{--DSJKA-23-FDW--}}
                                        {{--</div>--}}
                                    {{--</div>--}}
                                    {{--<div class="cell">--}}
                                        {{--<div class="title">--}}
                                            {{--DSJKA-23-FDW--}}
                                        {{--</div>--}}
                                    {{--</div>--}}
                                    {{--<div class="cell">--}}
                                        {{--<div class="title">--}}
                                            {{--DSJKA-23-FDW--}}
                                        {{--</div>--}}
                                    {{--</div>--}}
                                    {{--<div class="cell">--}}
                                        {{--<div class="title">--}}
                                            {{--DSJKA-23-FDW--}}
                                        {{--</div>--}}
                                    {{--</div>--}}

                                {{--</div>--}}
                            {{--@endfor--}}
                        {{--</div>--}}

                    {{--</div>--}}
                </div>
                <div id="salarypayments-table" ></div>
            </div>
        </div>
        <div class="content-rightside">
            @can('Создавать денежные перемещения')
                <button onclick="openDialog('moneymoveDialog')" class="w-290 button primary mb-15">Переместить средства</button>
            @endcan
            <div class="box w-290 p-15 filter-panel">
                <div class="box-title">Фильтр</div>
                <div class="form-group d-flex mb-10">
                    <label class="no-wrap" for="date_filter">Период</label>
                    <input id="date_filter" type="text" name="date_filter" value="{{ request('dates_range') }}" class="form-control date_filter input_as_link" placeholder="за всё время">
                    <button type="button" onclick="window.cash.resetDate()" class="right-remove"><i class="fa fa-remove"></i></button>
                </div>
                <div class="filter_field mb-10">
                    <div class="form-group d-flex mb-10">
                        <label class="no-wrap" for="provider">Ответственный</label>
                        <input readonly onclick="window.cash.openSelectPartnerModal('partner')" id="partner" type="text" name="partner" value="{{ request('partner') }}" class="form-control partner input_as_link" placeholder="выбрать">
                        <button type="button" onclick="window.cash.clearList('partner', 'partner_stack')" class="right-remove"><i class="fa fa-remove"></i></button>
                    </div>
                    <div id="partner_stack"></div>
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

