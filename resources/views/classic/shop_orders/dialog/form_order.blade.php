@if(!$request->inner)
    <div id="orderDialog{{ $order->id ?? '' }}" @if($order) data-id="{{ $order->id }}" @endif class="dialog new_dialog order_dialog" style="width:900px;">
@endif

    <div class="titlebar">{{ 'Заказ №' . ($order->id ?? '') }}</div>

    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>

    <form action="#" method="POST">

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

            <div id="order_tabs" class="tabs_links tab_links">
                <a href="#" class="active" data-target="tab_main">Основное</a>
                <a href="#" data-target="tab_products">Товары</a>
            </div>

            <div class="tabs_content w-100 mt-10 ml-15 mr-10 mb-10">

                <div id="tab_main" class="tab active" style="width: 500px;">

                    <div class="form-group-flex">
                        <label>Заказчик</label>
                        <input class="form-control" style="line-height: 30px;" value="{{ $order->partner->official_name ?? '' }}" disabled />
                    </div>

                    <div class="form-group-flex">
                        <label>Статус заказа</label>
                        <div class="w-100">
                            <select custom_select name="status">
                                @foreach($statuses as $status_id => $status_name)
                                    <option value="{{ $status_id }}">{{ $status_name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>

                    <div class="form-group-flex">
                        <label>Комментарий</label>
                        <textarea rows="4" class="form-control resize-none" placeholder="Комментарий">{{ $order->comment ?? '' }}</textarea>
                    </div>

                </div>

                <div id="tab_products" class="tab">

                    <div class="table_header">
                        <div class="pl-10" style="width: 30%;">Наименование</div>
                        <div style="width: 10%;">Артикул</div>
                        <div style="width: 20%;">Производитель</div>
                        <div style="width: 10%;">Кол-во</div>
                        <div style="width: 10%;">Наличие</div>
                        <div style="width: 10%;">Цена</div>
                        <div style="width: 10%;">Всего</div>
                    </div>

                    <div class="element-list">
                        @foreach($order->products as $product)
                            <div class="element-item">
                                <div class="pl-10" style="width: 30%;">{{ $product->name }}</div>
                                <div style="width: 10%;">{{ $product->article }}</div>
                                <div style="width: 20%;">{{ $product->supplier->name }}</div>
                                <div style="width: 10%;">
                                    <input type="text" class="form-control" name="count" value="{{ $product->pivot->count ?? 0 }}">
                                </div>
                                <div style="width: 10%;">{{ $product->getEntrancesCount() }}</div>
                                <div style="width: 10%;">{{ $product->pivot->price ?? 0 }}</div>
                                <div style="width: 10%;">{{ ($product->pivot->count * $product->pivot->price) ?? 0 }}</div>
                            </div>
                        @endforeach
                    </div>

                    <button type="button" class="button add_product_button" onclick="{{ $class }}.addProduct(this);">Добавить товар</button>

                </div>

            </div>

        </div>

        <div class="modal-footer" style="white-space: nowrap">
            <button type="button" class="button white uppercase-btn" onclick="{{ $class }}.finitaLaComedia()">Закрыть</button>
            <button type="button" class="button primary float-right" onclick="{{ $class }}.save(this);">Сохранить</button>
        </div>

        <div class="system_message">

        </div>
    </form>

@if(!$request->inner)
    </div>
@endif
