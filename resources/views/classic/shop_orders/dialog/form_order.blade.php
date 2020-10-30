@if(!$request->inner)
    <div id="orderDialog{{ $order->id ?? '' }}" @if($order) data-id="{{ $order->id }}" @endif class="dialog new_dialog order_dialog" style="width:900px;">
@endif

    <div class="titlebar">{{ 'Заказ №' . ($order->id ?? '') }}</div>

    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>

    <form action="{{ route('StoreOrder') }}" method="POST">

        <input type="hidden" name="order_id" value="{{ $order->id ?? '' }}">

        <div class="modal-header dark" style="-webkit-justify-content: flex-start;justify-content: normal;">

            <div class="modal-alt-header">
                <span class="item-title _500">Магазин</span>
                <div class="item-except font-weight-bolder h-1x">
                    <span id="store_selected">
                        {{ auth()->user()->getStoreFirst()->name }}
                    </span>
                </div>
                <div class="item-tag tag hide">
                </div>
            </div>

            <div class="modal-alt-header">
                <span class="item-title _500">Итого</span>
                <div class="item-except font-weight-bolder h-1x">
                    <span id="total_price">{{ correct_price($order->total_price ?? 0.00) }}</span> р
                </div>
                <div class="item-tag tag hide">
                </div>
            </div>

        </div>

        <div class="d-flex">

            <div id="order_tabs" class="tab_links">
                <span class="pointer active" data-target="tab_main">Основное</span>
                <span class="pointer" data-target="tab_products">Товары</span>
            </div>

            <div class="tabs_content w-100 mt-10 ml-15 mr-10 mb-10">

                <div id="tab_main" class="tab active" style="width: 500px;">

                    <div class="form-group-flex">
                        <label>Заказчик</label>
                        <input class="form-control" style="line-height: 30px;" value="{{ $order->partner->official_name ?? '' }}" disabled />
                    </div>

                    <div class="form-group-flex">
                        <label>Номер телефона</label>
                        <input class="form-control phone_input" style="line-height: 30px;" value="{{ $order->phone ?? '' }}" disabled />
                    </div>

                    <div class="form-group-flex">
                        <label>Email адрес</label>
                        <input class="form-control" style="line-height: 30px;" value="{{ $order->email ?? 'Не указан' }}" disabled />
                    </div>

                    <div class="form-group-flex">
                        <label>Статус</label>
                        <input class="form-control" style="line-height: 30px;" value="{{ $order->getStatusName() }}" disabled />
                    </div>

                    <div class="form-group-flex">
                        <label>Тип оплаты</label>
                        <input class="form-control" style="line-height: 30px;" value="{{ $order->getPayTypeName() }}" disabled />
                    </div>

                    <div class="form-group-flex">
                        <label>Комментарий</label>
                        <textarea rows="4" name="comment" class="form-control resize-none" @if($order->status != 0) disabled @endif placeholder="Комментарий">{{ $order->comment ?? '' }}</textarea>
                    </div>

                </div>

                <div id="tab_products" class="tab">

                    <div data-prefs="{{ $prefs }}" data-items="{{ json_encode($order ? $order->positions->toArray() : []) }}" id="order_list">

                    </div>

                </div>

            </div>

        </div>

        <div class="modal-footer" style="white-space: nowrap">
            <button type="button" class="button white uppercase-btn" onclick="{{ $class }}.finitaLaComedia();">Закрыть</button>

            @if($order->status == 0)
                <button type="button" class="button green float-right ml-10" onclick="{{ $class }}.acceptOrder(this);">Подтвердить</button>
                <button type="button" class="button red float-right" onclick="{{ $class }}.cancelOrder(this);">Отменить</button>
            @endif
        </div>

        <div class="system_message">

        </div>
    </form>

@if(!$request->inner)
    </div>
@endif
