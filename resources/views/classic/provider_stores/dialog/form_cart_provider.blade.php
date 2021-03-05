<div id="providerCartDialog" class="dialog provider_cart_dialog new_dialog" style="width:855px;">

    <div class="titlebar">Оформление заявки поставщикам</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>

    <div class="modal-header tab-container">
        <ul class="nav header_selects_navs">
            <li class="nav-item">
                <a onclick="window.{{ $class }}.activateTab(this, 'product_list');"
                   class="button primary mr-15 tab-btn active">Список заявкок</a>
            </li>
            <li class="nav-item">
                <a onclick="window.{{ $class }}.activateTab(this, 'client_order');"
                   class="button primary mr-15 tab-btn ">Заказ клиента</a>
            </li>
        </ul>
    </div>

    <form data-simplebar action="{{ route('ProviderCartOrder') }}" method="POST" style="height: 400px;">

        <div role="tab" class="product_list">
            <div class="providers m-15">

                @foreach($orders as $provider_key => $orders)

                    <div id="{{ $provider_key }}" class="provider d-flex mb-10">

                        <div class="header">

                            <div class="name w-100 d-flex">
                                <div class="toggle pointer" onclick="{{ $class }}.togglePosition(this);">
                                    <i class="fa fa-5 fa-angle-down" aria-hidden="true" style="color: #B2BDCE;"></i>
                                </div>
                                <div>{{ $provider_key }}</div>
                            </div>

                            <div class="fields flex-1 p-10 pt-0">

                                @foreach($deliveryInfo[$provider_key] as $infoName => $infoParams)

                                    @continue(count($infoParams['params']) == 0)

                                    <div class="form-group {{ $infoParams['field'] }}">
                                        <label>{{ $infoName }}</label>
                                        <div class="w-100">
                                            <select
                                                @isset($infoParams['onchange']) onchange="{{ $class . '.' . $infoParams['onchange'] }}(this);"
                                                @endisset custom_select
                                                name="providers[{{ $provider_key }}][{{ $infoParams['field'] }}]">
                                                @foreach($infoParams['params'] as $id => $name)
                                                    <option value="{{ $id }}">{{ $name }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>

                                @endforeach

                                <div class="form-group mb-0">
                                    <label>Комментарий</label>
                                    <textarea name="comments[{{ $provider_key }}]" class="form-control resize-none"
                                              placeholder="Комментарий" style="height: 31px;"></textarea>
                                </div>

                            </div>

                        </div>

                        <div class="body w-100">

                            <div class="fields" style="min-height: 39px;">

                                <div class="position">
                                    <span>Позиций</span>
                                    <span class="ml-10"
                                          id="provider_positions_count">{{ $providersInfo[$provider_key]['positions'] }}</span>
                                </div>

                                <div class="price">
                                    <span>Стоимость</span>
                                    <span class="ml-10"
                                          id="provider_total_price">{{ correct_price($providersInfo[$provider_key]['total_price']) }}</span>
                                </div>

                                <div class="remove"
                                     onclick="{{ $class }}.removeProviderOrders(this, '{{ $provider_key }}');">
                                    <div></div>
                                </div>

                            </div>

                            <div class="table mr-10 mt-10 mb-10">

                                <div id="table-list">

                                    <div class="table-header d-flex w-100">
                                        <div class="pl-10" style="width: 90px;">Артикул</div>
                                        <div class="pl-10" style="width: 112px;">Производитель</div>
                                        <div class="pl-10" style="width: 84px;">Цена \ ед</div>
                                        <div class="pl-10" style="width: 127px;">Количество</div>
                                        <div class="pl-10">Общая стоимость</div>
                                    </div>

                                    <div data-simplebar class="table-body w-100" style="height: 247px;">
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
                        <span class="ml-10">
                        <b id="positions_count">{{ $providersInfo->sum('positions') }}</b>
                    </span>
                    </div>

                    <div class="price">
                        <span>Стоимость</span>
                        <span class="ml-10">
                        <b id="total_price">{{ correct_price($providersInfo->sum('total_price')) }}</b>
                    </span>
                    </div>

                </div>

            </div>
        </div>
        <div role="tab" class="client_order d-none " >
            <div class="providers m-15">
                <div class="form-group row row-sm">
                    <div class="ui-switch-flex ml-15">
                        <label class="ui-switch">
                            <input id="client_order_status" name="client_order_status" type="checkbox" value="false" onclick="{{$class}}.activateClientOrder(this)"><i></i>
                        </label>
                        <span class="ui-switch-desc">Оформить заказ клиенту</span>
                    </div>
                </div>
                <div class="disabled" id="client_order_data">
                    <div class="form-group row row-sm">
                        <input class="partner_select" type="hidden" name="partner_id">
                        <label for="partner_id" class="col-sm-2 no-pr col-form-label">Заказчик</label>
                        <div class="col-sm-5">
                            <button onclick="{{$class}}.openSelectPartnermodal()" type="button" name="partner_id"
                                    class="partner_select form-control text-left button_select">
                                Не выбрано
                            </button>
                        </div>
                    </div>
                    <div class="form-group row row-sm">
                        <input id="inpercents" name="inpercents" type="hidden" value="0" >
                        <label class="col-sm-2" for="discount">Скидка</label>
                        <div class="col-sm-5 input-group">
                            <input onClick="this.select();" type="number" name="discount" class="form-control" placeholder="Скидка" value="0">
                            <span class="input-group-append">
                                <div class="dropdown" onclick="window.helper.openModal(this, event)">
                                    <div class="drop-butt"><span id="inpercents_text">в рублях</span> <i class="fa fa-chevron-down" aria-hidden="true"></i></div>
                                    <div class="dropdown_container">
                                        <div class="arrow"></div>
                                        <span onclick="{{ $class }}.setField('inpercents', 0, 'в рублях', this)" class="element">В рублях</span>
                                        <span onclick="{{ $class }}.setField('inpercents', 1, 'в процентах', this)" class="element">В процентах</span>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div class="form-group row row-sm">
                        <label class="col-sm-2" for="phone">Телефон</label>
                        <div class="col-sm-5 input-group">
                            <input id="client-phone" type="text" name="phone" class="form-control phone_input"
                                   placeholder="Телефон">
                            <span class="input-group-append">
                                <div class="dropdown" onclick="window.helper.openModal(this, event)">
                                    <div class="drop-butt"><span>Номера контакта</span> <i class="fa fa-chevron-down"
                                                                                           aria-hidden="true"></i></div>
                                    <div class="dropdown_container">
                                        <div class="arrow"></div>
                                        <div id="phones-list">
                                            <div class="no-result">
                                                    <div class="text-center">
                                                        Выберите контакт
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>


    <div class="modal-footer">
        <button class="button white uppercase-btn" onclick="{{ $class }}.finitaLaComedia(this);">Закрыть</button>
        <div class="pull-right">
            <button type="button" class="button clear-button uppercase-btn mr-10"
                    onclick="{{ $class }}.clearCart(this);">
                <i class="fa fa-trash" aria-hidden="true"></i>
                <span>Очистить</span>
            </button>
            <button type="button" class="button primary uppercase-btn" onclick="{{ $class }}.send(this);">Отправить
                заявки
            </button>
        </div>

    </div>

    <div class="system_message">
    </div>

</div>
