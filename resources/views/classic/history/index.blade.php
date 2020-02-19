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
                <ul class="nav select-list-modal ">
                    @foreach(Auth::user()->company()->first()->members()->get() as $member)
                        <li id="providerorder_item_1" onclick="try{window.warrantDialog.selectPartner(1)}catch (e) {}" class="pointer d-flex margin-sides2">
                            <div class="list-title alone full-width">
                                {{ $member->partner()->first()->outputName() }}
                                <div class="secondary">Категория: {{ $member->partner()->first()->category()->first()->name }}</div>
                            </div>
                        </li>
                    @endforeach
                </ul>
            </div>
        </div>
        <div class="box-lister box">
            <div id="table-container" class="box-content">
                <div class="streamline p-15 pr-0">
                    <div  data-simplebar style="max-height: calc(100vh - 112px);">
                        @foreach($actions as $action)
                            <div class="sl-item mr-15
                            @switch($action->type)
                                @case('fresh') b-info @break
                                @case('delete') b-danger @break
                                @case('create') b-success @break
                                @case('restore') b-primary @break
                            @endswitch
                                    ">
                                <div class="sl-content">
                                    <div class="sl-date text-muted">{{$action->created_at->diffForHumans()}}</div>
                                    <p>{{ $action->user()->first()->partner()->first()->outputName() }}
                                        <a href="#" class="text-info">{{ $action->message }}</a>.</p>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
        <div class="box-lister box ml-0">
            <div id="table-container" class="box-content">
                <div class="streamline p-15 pr-0">
                    <div  data-simplebar style="max-height: calc(100vh - 112px);">
                        @foreach($actions as $action)
                            <div class="sl-item mr-15
                            @switch($action->type)
                            @case('fresh') b-info @break
                            @case('delete') b-danger @break
                            @case('create') b-success @break
                            @case('restore') b-primary @break
                            @endswitch
                                    ">
                                <div class="sl-content">
                                    <div class="sl-date text-muted">{{$action->created_at->diffForHumans()}}</div>
                                    <p>{{ $action->user()->first()->partner()->first()->outputName() }}
                                        <a href="#" class="text-info">{{ $action->message }}</a>.</p>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
        <div class="content-rightside">
            <button onclick="openDialog('entranceDialog')" class="button primary mb-15 w-100">Оформить поступление</button>
            <div class="box w-290 p-15 filter-panel">
                <div class="box-title">Фильтр</div>
                <div class="form-group d-flex mb-10">
                    <label class="no-wrap" for="date_filter">Период</label>
                    <input id="date_filter" type="text" name="date_filter" value="{{ request('dates_range') }}" class="form-control date_filter input_as_link" placeholder="за всё время">
                    <button type="button" onclick="window.store.resetDate()" class="right-remove"><i class="fa fa-remove"></i></button>
                </div>
                <div class="filter_field mb-10">
                    <div class="form-group d-flex mb-10">
                        <label class="no-wrap" for="provider">Поставщик</label>
                        <input readonly onclick="store.openSelectPartnerModal('provider')" id="provider" type="text" name="provider" value="{{ request('pay_status') }}" class="form-control provider input_as_link" placeholder="выбрать">
                        <button type="button" onclick="store.clearList('provider', 'provider_stack')" class="right-remove"><i class="fa fa-remove"></i></button>
                    </div>
                    <div id="provider_stack"></div>
                </div>
                <div class="filter_field mb-10">
                    <div class="form-group d-flex">
                        <label class="no-wrap" for="accountable">Принимающий</label>
                        <input readonly onclick="store.openSelectPartnerModal('accountable')" id="accountable" type="text" name="accountable" value="{{ request('pay_status') }}" class="form-control accountable input_as_link" placeholder="не выбрано">
                        <button type="button" onclick="store.clearList('accountable', 'accountable_stack')" class="right-remove"><i class="fa fa-remove"></i></button>
                    </div>
                    <div id="accountable_stack"></div>
                </div>
                <hr>
                <div class="box-title">Контактная информация</div>
                <div id="contact_block"></div>
                <hr>
                <div class="box-title">Комментарий</div>
                <div id="comment_block"></div>
            </div>
        </div>
    </div>
@endsection
