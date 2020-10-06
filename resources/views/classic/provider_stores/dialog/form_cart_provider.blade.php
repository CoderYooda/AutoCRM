<div id="providerCartDialog" class="dialog provider_cart_dialog new_dialog" style="width:750px;">

    <div class="titlebar">Оформление заявки поставщикам</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>

    <form data-simplebar action="{{ route('ProviderCartOrder') }}" method="POST" style="height: 400px;">

        <div class="providers m-15">

            @foreach($orders as $provider_key => $orders)

                <div class="provider d-flex mb-10">

                    <div class="header" style="width: 222px;">

                        <div class="name w-100 d-flex">
                            <div class="toggle pointer">
                                <i class="fa fa-5 fa-angle-down" aria-hidden="true" style="color: #B2BDCE;"></i>
                            </div>
                            <div>{{ $provider_key }}</div>
                        </div>

                        <div class="fields flex-1 p-10">

                            @foreach([1, 2, 3] as $i)

                                <div class="form-group">
                                    <label>Список адресов доставки</label>
                                    <input type="text" class="form-control" name="" value="">
                                </div>

                            @endforeach

                        </div>

                    </div>

                    <div class="body w-100">

                        <div class="fields d-flex d-none">

                            <div class="position">
                                <span>Позиций</span>
                                <span class="ml-10">12</span>
                            </div>

                            <div class="price">
                                <span>Стоимость</span>
                                <span class="ml-10">10 485.00</span>
                            </div>

                            <div class="remove">
                                <div></div>
                            </div>

                        </div>

                        <div class="table">

                            <div id="table-list">

                                <div class="table-header d-flex w-100">
                                    <div class="pl-10" style="width: 15%">Артикул</div>
                                    <div style="width: 23%">Производитель</div>
                                    <div style="width: 57%">Название</div>
                                    <div></div>
                                </div>

                                <div data-simplebar class="table-body w-100" style="height: 216px;">
                                    <div id="product-list">
                                        @foreach($orders as $order)
                                            @include(get_template() . '.provider_stores.dialog.product_element')
                                        @endforeach
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            @endforeach

            <div class="total">

                <div class="name">
                    <span>Итого:</span>
                </div>

                <div class="position">
                    <span>Позиций</span>
                    <span class="ml-10"><b>24</b></span>
                </div>

                <div class="price">
                    <span>Стоимость</span>
                    <span class="ml-10"><b>21 225.00</b></span>
                </div>

            </div>

        </div>

{{--        <div class="d-flex">--}}

{{--            <div class="flex-4 pl-15 pt-15 pr-15">--}}

{{--                @foreach($orders as $provider_key => $orders)--}}

{{--                    <div id="{{ $provider_key }}" class="provider">--}}

{{--                        <h2 class="mb-10">{{ ucfirst($provider_key) }}</h2>--}}

{{--                        <div data-simplebar style="height: 200px;">--}}

{{--                            <table class="w-100" cellspacing="0">--}}

{{--                                <thead>--}}
{{--                                    <tr>--}}
{{--                                        <th>Склад</th>--}}
{{--                                        <th>Производитель</th>--}}
{{--                                        <th>Артиркул</th>--}}
{{--                                        <th>Цена за шт</th>--}}
{{--                                        <th>Количество</th>--}}
{{--                                        <th>Общая стоимость</th>--}}
{{--                                    </tr>--}}
{{--                                </thead>--}}

{{--                                <tbody>--}}
{{--                                    @foreach($orders as $order)--}}

{{--                                        <tr>--}}
{{--                                            <td>{{ $order->data->hash_info->stock }}</td>--}}
{{--                                            <td>{{ $order->data->hash_info->manufacturer }}</td>--}}
{{--                                            <td>{{ $order->data->hash_info->article }}</td>--}}
{{--                                            <td>--}}
{{--                                                <span class="price_elem">{{ correct_price($order->data->hash_info->price) }}</span> ₽--}}
{{--                                            </td>--}}
{{--                                            <td><input type="text" class="count_elem" name="orders[{{ $order->id }}][count]" style="width: 60px; text-align: center;" value="{{ $order->count }}"></td>--}}
{{--                                            <td>--}}
{{--                                                <span class="total_elem">{{ correct_price($order->data->hash_info->price * $order->count) }}</span> ₽--}}
{{--                                                <i class="fa fa-trash ml-15 pointer" aria-hidden="true" onclick="{{ $class }}.removeProduct(this, {{ $order->id }});"></i>--}}
{{--                                            </td>--}}
{{--                                        </tr>--}}

{{--                                    @endforeach--}}
{{--                                </tbody>--}}
{{--                            </table>--}}

{{--                        </div>--}}

{{--                        @foreach($deliveryInfo[$provider_key] as $infoName => $infoParams)--}}

{{--                            @continue(count($infoParams['params']) == 0)--}}

{{--                            <div class="form-group {{ $infoParams['field'] }}">--}}

{{--                                <label>{{ $infoName }}:</label>--}}

{{--                                <div style="width: 70%;">--}}
{{--                                    <select @isset($infoParams['onclick']) onchange="{{ $class . '.' . $infoParams['onclick'] }}(this);" @endisset custom_select name="providers[{{ $provider_key }}][{{ $infoParams['field'] }}]">--}}
{{--                                        @foreach($infoParams['params'] as $id => $name)--}}
{{--                                            <option value="{{ $id }}">{{ $name }}</option>--}}
{{--                                        @endforeach--}}
{{--                                    </select>--}}
{{--                                </div>--}}

{{--                            </div>--}}

{{--                        @endforeach--}}

{{--                        <hr/>--}}

{{--                    </div>--}}

{{--                @endforeach--}}

{{--            </div>--}}

{{--            <div class="flex-1 all-center flex-column info-block">--}}
{{--                <span>Общая сумма:</span>--}}
{{--                <span id="total_price">{{ correct_price($total_price) }}</span>--}}
{{--            </div>--}}

{{--        </div>--}}

{{--        <div class="form-group p-10 mt-15" style="border-top: 1px solid #dee2e6;">--}}
{{--            <label>Комментарий</label>--}}
{{--            <textarea name="comment" class="form-control resize-none" style="width: 50%; height: 60px;">Тестовый заказ, отмените его</textarea>--}}
{{--        </div>--}}

{{--        <div class="modal-footer">--}}
{{--            <button class="button white uppercase-btn" onclick="{{ $class }}.finitaLaComedia(this);">Закрыть</button>--}}
{{--            <div class="pull-right">--}}
{{--                <button type="button" class="button clear-button uppercase-btn" onclick="{{ $class }}.clearCart(this);">--}}
{{--                    <i class="fa fa-trash" aria-hidden="true"></i>--}}
{{--                    <span>Очистить</span>--}}
{{--                </button>--}}
{{--                <button type="button" class="button primary uppercase-btn" onclick="{{ $class }}.send(this);">Отправить заявки</button>--}}
{{--            </div>--}}

{{--        </div>--}}

{{--        <div class="system_message">--}}
{{--        </div>--}}

    </form>

</div>
