<div id="selectShipmentDialog" class="dialog" style="width:600px;">
    <div id="select_shipment_container" class="select_shipment_container fade" data-simplebar style="height: 400px;">
        <div class="cont"></div>
        <div class="empty_desc">
            <div class="out_of_search"></div>
            <div class="text-center">Товаров нет</div>
        </div>
    </div>
    <div class="titlebar">Выбор продажи</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia();">×</button>
    <div class="modal-header">
        <form class="flex d-flex w-100 ShipmentStoredListner">
            @if($request['refer'])
                <input id="refer" type="hidden" name="refer" value="{{ $request['refer'] }}">
            @endif
            @if($request['target'])
                <input id="target" type="hidden" name="target" value="{{ $request['target'] }}">
            @endif
            @if($request['category_id'])
                <input id="category_id" type="hidden" name="category_id" value="{{ $request['category_id'] }}">
            @endif
            <input id="selectshipment_search" type="text" class="form-control search" placeholder="Поиск продаж" required="">
{{--            <button id="new_btn" onclick="openDialog('shipmentDialog', '&category_select={{ $categories['parent']->id }}' )" class="button" type="button">Новый контакт</button>--}}
        </form>
    </div>
    <div id="shipment_list">
        <div id="search_shipment_results" class="row row-sm">
            @include(get_template() . '.shipments.dialog.select_shipment_inner')
        </div>
    </div>
    <div class="modal-footer">
        <button class="button white" onclick="window.{{ $class }}.finitaLaComedia(this)">Закрыть</button>
    </div>
    <div class="system_message">

    </div>
</div>
