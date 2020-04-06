@extends($request['view_as'] == 'json' && $request['target'] != null ? env('DEFAULT_THEME', 'classic') . '.layouts.TabXHR' : env('DEFAULT_THEME', 'classic') . '.store.layout.tabs')

@section('tab')
    <div id="ajax-table-adjustments" class="bottom-container">
        <div class="box-lister box">
            <div id="table-container" class="box-content">
                <div id="adjustment-table" ></div>
            </div>
        </div>
        <div class="content-rightside">
            @can('Создавать корректировки')
                <button onclick="openDialog('adjustmentDialog')" class="button primary mb-15 w-100">Новая корректировка</button>
            @endcan
            <div class="box w-290 p-15 filter-panel">
                <div class="box-title">Фильтр</div>
                <div class="form-group d-flex mb-10">
                    <label class="no-wrap" for="date_filter">Период</label>
                    <input id="date_filter" type="text" name="date_filter" value="{{ request('dates_range') }}" class="form-control date_filter input_as_link" placeholder="за всё время">
                    <button type="button" onclick="window.store.resetDate()" class="right-remove"><i class="fa fa-remove"></i></button>
                </div>
                <div class="filter_field mb-10">
                    <div class="form-group d-flex">
                        <label class="no-wrap" for="accountable">Ответственный</label>
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
