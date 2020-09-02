<div id="selectClientOrderDialog" class="dialog" style="width:600px;">

    <div class="titlebar">Выбор заказа клиента</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia();">×</button>
    <div class="modal-header">
        <form class="flex d-flex w-100 ClientOrderStoredListner">
            @if($request['refer'])
                <input id="refer" type="hidden" name="refer" value="{{ $request['refer'] }}">
            @endif
            <input id="search" name="search" type="text" class="form-control search" placeholder="Поиск продаж" required>
        </form>
    </div>
    <div id="client_order_list">
        <div id="search_client_order_results" class="row row-sm">
            @include(get_template() . '.client_orders.dialog.select_client_order_inner')
        </div>
    </div>
    <div class="modal-footer">
        <button class="button white" onclick="window.{{ $class }}.finitaLaComedia(this)">Закрыть</button>
    </div>
    <div class="system_message">

    </div>
</div>
