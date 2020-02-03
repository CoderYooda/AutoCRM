@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? env('DEFAULT_THEME', 'classic') . '.layouts.TabXHR' : env('DEFAULT_THEME', 'classic') . '.cash.layout.tabs')

@section('tab')
    <div id="ajax-table-warrant" class="bottom-container">
        <div class="box-lister box">
            <div id="table-container" class="box-content">
                <div id="warrant-table" ></div>
            </div>
        </div>
        <div class="content-rightside">
            <div class="w-290">
                <button onclick="openDialog('warrantDialog', '&isIncoming=1')" class="w-100 button primary mb-15">Новый приходный ордер</button>
                <button onclick="openDialog('warrantDialog', '&isIncoming=0')" class="w-100 button primary mb-15">Новый расходный ордер</button>
            </div>

            <div class="box w-290 p-15 filter-panel">
                <div class="box-title">Фильтр</div>
                <div class="form-group d-flex mb-10">
                    <label class="no-wrap" for="date_filter">Период</label>
                    <input id="date_filter" type="text" name="date_filter" value="{{ request('dates_range') }}" class="form-control date_filter input_as_link" placeholder="за всё время">
                    <button type="button" onclick="window.cash.resetDate()" class="right-remove"><i class="fa fa-remove"></i></button>
                </div>
                <div class="filter_field mb-10">
                    <div class="form-group d-flex mb-10">
                        <label class="no-wrap" for="provider">Контрагент</label>
                        <input readonly onclick="window.cash.openSelectPartnerModal('partner')" id="partner" type="text" name="partner" value="{{ request('partner') }}" class="form-control partner input_as_link" placeholder="выбрать">
                        <button type="button" onclick="window.cash.clearList('partner', 'partner_stack')" class="right-remove"><i class="fa fa-remove"></i></button>
                    </div>
                    <div id="partner_stack"></div>
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

