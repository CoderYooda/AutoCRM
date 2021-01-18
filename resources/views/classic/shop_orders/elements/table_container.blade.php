@include(get_template() . '.store.elements.search')

<div class="content-rightside">
    <div class="box w-290 p-15 filter-panel">
        <div class="box-title">Фильтр</div>
        <div class="form-group d-flex mb-10">
            <label class="no-wrap" for="date_filter">Период</label>
            <input id="date_filter" type="text" name="date_filter" value="{{ request('dates_range') }}" class="form-control date_filter input_as_link" placeholder="за всё время">
            <button type="button" onclick="window.store.resetDate()" class="right-remove"><i class="fa fa-remove"></i></button>
        </div>
        <div class="filter_field mb-10">
            <div class="form-group d-flex mb-10">
                <label class="no-wrap" for="provider">Заказчик</label>
                <input readonly onclick="store.openSelectPartnerModal('client')" id="provider" type="text" name="provider" value="{{ request('pay_status') }}" class="form-control provider input_as_link" placeholder="выбрать">
                <button type="button" onclick="store.clearList('client', 'client_stack')" class="right-remove"><i class="fa fa-remove"></i></button>
            </div>
            <div id="client_stack"></div>
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
