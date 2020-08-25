<div id="providerCartDialog" class="dialog provider_cart_dialog" style="width:750px;">

    <div class="titlebar">Оформление заявки поставщикам</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>

    <div class="d-flex">

        <div class="flex-4 pl-15 pt-15 pr-15">

            @foreach($orders as $provider_name => $orders)

                <h2 class="mb-10">{{ ucfirst($provider_name) }}</h2>

                <table class="w-100" cellspacing="0">
                    <tr>
                        <th>Склад</th>
                        <th>Производитель</th>
                        <th>Артиркул</th>
                        <th>Цена за шт</th>
                        <th>Количество</th>
                        <th>Общая стоимость</th>
                    </tr>

                    @foreach($orders as $order)

                    <tr>
                        <td>{{ $order->stock }}</td>
                        <td>{{ $order->manufacturer }}</td>
                        <td>{{ $order->article }}</td>
                        <td>{{ correct_price($order->price) }} ₽</td>
                        <td><input type="text" style="width: 60px; text-align: center;" value="{{ $order->count }}"></td>
                        <td>
                            <span>{{ correct_price($order->price * $order->count) }} ₽</span>
                            <i class="fa fa-trash ml-15 pointer" aria-hidden="true"></i>
                        </td>
                    </tr>

                    @endforeach
                </table>

            @endforeach

        </div>

        <div class="flex-1 all-center flex-column info-block">
            <span>Общая сумма:</span>
            <span>1 000 000</span>
        </div>

    </div>

    <div class="modal-footer">
        <button class="button white uppercase-btn" onclick="{{ $class }}.finitaLaComedia(this)">Закрыть</button>
        <div class="pull-right">
            <button type="button" class="button clear-button uppercase-btn" onclick="{{ $class }}.saveAndClose(this)">
                <i class="fa fa-trash" aria-hidden="true"></i>
                <span>Очистить</span>
            </button>
            <button type="button" class="button primary uppercase-btn" onclick="{{ $class }}.send(this)">Отправить заявки</button>
        </div>

    </div>

    <div class="system_message">
    </div>

</div>
