@if(!isset($inner) || !$inner)

<div
    @if(isset($shipment) && $shipment->id != NULL)
        @php
            $class = 'shipmentDialog' . $shipment->id
        @endphp
        id="shipmentDialog{{$shipment->id}}" data-id="{{$shipment->id}}"
    @else
        @php
            $class = 'shipmentDialog'
        @endphp
        id="shipmentDialog"
    @endif

    class="dialog shipment_dialog" style="width:920px;">
@endif

    @if(isset($shipment) && $shipment->id != NULL)
        <div class="titlebar">Продажа №{{ $shipment->id }} @if($shipment->clientOrder != null) по заказу № {{ $shipment->clientOrder->id }} @endif</div>
    @else
        <div class="titlebar">Новая продажа @if(isset($shipment) && $shipment->clientOrder != null) по заказу № {{ $shipment->clientOrder->id }} @endif</div>
    @endif
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia()">×</button>

    <div class="modal-header" style="justify-content: normal;">
        <div class="modal-alt-header">
            <span class="item-title _500">Магазин</span>
            <div class="item-except font-weight-bolder h-1x">
                    <span id="store_selected">
                        {{ Auth::user()->getStoreFirst()->name }}
                    </span>
            </div>
            <div class="item-tag tag hide">
            </div>
        </div>
        <div class="modal-alt-header">
            <span class="item-title _500">Всего на сумму</span>
            <div class="item-except font-weight-bolder h-1x">
                    <span id="total_price">
                        @if(isset($shipment) && $shipment->summ != NULL){{ $shipment->summ }} @else 0.0 @endif
                    </span> р
            </div>
            <div class="item-tag tag hide">
            </div>
        </div>
        <div class="modal-alt-header">
            <span class="item-title _500">Скидка</span>
            <div class="item-except font-weight-bolder h-1x">
                    <span id="percents_price">
                        @if(isset($shipment) && $shipment->id != NULL)
                        {{ $shipment->discount }}  @if($shipment->inpercents)% @else р @endif
                        @else 0 р @endif
                    </span>
            </div>
            <div class="item-tag tag hide">
            </div>
        </div>
        <div class="modal-alt-header">
            <span class="item-title _500">Итого</span>
            <div class="item-except font-weight-bolder h-1x">
                    <span id="itogo_price">
                        @if(isset($shipment) && $shipment->itogo != NULL)
                            {{ $shipment->itogo }}
                        @else 0.0 @endif
                    </span> р
            </div>
            <div class="item-tag tag hide">
            </div>
        </div>
        @if(isset($shipment) && $shipment->id != NULL && $shipment->clientOrder == NULL )
            <div class="modal-alt-header">
                <span class="item-title _500">Оплачено</span>
                <div class="item-except @if($shipment->wsumm >= $shipment->itogo) text-success @endif font-weight-bolder h-1x">
                    <span>
                        {{ correct_price($shipment->wsumm) }} р / <span id="payed_price">{{ correct_price($shipment->itogo) }}</span> р
                    </span>
                </div>
                <div class="item-tag tag hide">
                </div>
            </div>
        @endif

        @if(isset($shipment) && $shipment->id != NULL && $shipment->clientOrder == NULL && ($shipment->wsumm < $shipment->itogo))
            <div class="modal-alt-header">
                <button onclick="{{ $class }}.getPayment()" class="button success uppercase-btn">Принять оплату</button>
            </div>
        @endif

        @if(isset($shipment) && $shipment->id != NULL && $shipment->clientOrder == NULL && ($shipment->wsumm > $shipment->itogo) )
            <div class="modal-alt-header">
                <button onclick="{{ $class }}.getBackPayment()" class="button warning uppercase-btn">Вернуть средства</button>
            </div>
        @endif
    </div>

    <form name="ShipmentForm" class="WarrantStoredListner PartnerSelectedListner" action="{{ route('StoreShipment') }}" method="POST">
        <div class="box-body">
            @csrf

            <input type="hidden" name="id" value="{{ $shipment->id ?? '' }}">

            @if(isset($shipment))
                <input type="hidden" name="summ" value="{{ decimal_price($shipment->summ) }}">
                <input type="hidden" name="itogo" value="{{ decimal_price($shipment->itogo) }}">
                <input type="hidden" name="ostatok" value="{{ decimal_price($shipment->itogo - $shipment->wsumm) }}">
                @if($shipment->clientOrder)
                    <input type="hidden" name="clientorder_id" value="{{ $shipment->clientOrder->id }}">
                @endif
            @endif

            <input type="hidden" name="store_id" value="{{ Auth::user()->getStoreFirst()->id }}">
            <input class="partner_select" type="hidden" name="partner_id" value="{{ $shipment->partner->id ?? null }}">
            <input id="inpercents" name="inpercents" type="hidden" @if($shipment && $shipment->id != NULL && $shipment->inpercents) value="1" @else value="0" @endif>
            <div class="row row-sm">
                <div class="col-sm-6">
                    <div class="form-group row">
                        <label for="partner_id" class="col-sm-3 no-pr col-form-label">Покупатель</label>
                        <div class="col-sm-6 no-pr">
                            <button onclick="{{ $class }}.openSelectPartnermodal()" type="button" name="partner_id" class="partner_select form-control text-left button_select" @if(isset($shipment)) disabled @endif>
                                @if(isset($shipment) && $shipment->partner != NULL && $shipment->partner != null)
                                    {{ $shipment->partner->outputName() }}
                                @else
                                    Нажмите для выбора
                                @endif
                            </button>
                        </div>
                        <div class="col-sm-3">
                            <span class="partner-balance">
                                Баланс:<br>
                                <span id="balance">{{ correct_price($shipment->partner->balance ?? 0.0) }} р</span>
                            </span>
                        </div>
                    </div>

                    @if(!isset($shipment))
                        <div class="form-group row">
                            <label class="col-form-label pr-10">Анонимный покупатель</label>
                            <input type="checkbox" name="anonymous" onchange="{{ $class }}.anonymousBuyerToggle(this)" style="max-height: 15px; margin-top: 3px;" />
                        </div>
                    @endif

                    <div class="form-group row">
                        <label class="col-sm-3" for="discount">Скидка</label>
                        <div class="col-sm-9 input-group">
                            <input onclick="this.select();" type="number" name="discount" class="form-control" placeholder="Скидка" @if($shipment  && $shipment->id != NULL) value="{{ $shipment->discount }}" @else value="0" @endif>
                            <span class="input-group-append">
                                <div class="dropdown" onclick="window.helper.openModal(this, event)">
                                    <div class="drop-butt"><span id="inpercents_text"> @if(isset($shipment) && $shipment->id != NULL && $shipment->inpercents)в процентах@elseв рублях@endif</span> <i class="fa fa-chevron-down" aria-hidden="true"></i></div>
                                    <div class="dropdown_container">
                                        <div class="arrow"></div>
                                        <span onclick="{{ $class }}.setField('inpercents', 0, 'в рублях', this)" class="element">В рублях</span>
                                        <span onclick="{{ $class }}.setField('inpercents', 1, 'в процентах', this)" class="element">В процентах</span>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 form-group">
                    <textarea placeholder="Комментарий" style="resize: none;height: 85px;" class="form-control" name="comment" id="shipment_dialog_focused" cols="30" rows="4">@if(isset($shipment) && $shipment->id != NULL){{ $shipment->comment }}@endif</textarea>
                </div>
            </div>

            <div class="form-group">
                <div for="category_id" class="mb-15"><b>Список приходных номенклатур</b>
                </div>
                <div data-simplebar style="max-height: 300px;">
                    <table class="table-modal" >
                        <thead class="text-muted">
                        <tr>
                            <th width="30%">Наименование</th>
                            <th width="10%">Артикул</th>
                            <th width="10%" style="min-width: 60px;">Кол-во</th>
                            <th width="10%" style="min-width: 60px;">Доступное кол-во</th>
                            <th width="10%" style="min-width: 100px;">Цена</th>
                            <th width="10%" style="min-width: 100px;">Всего</th>
                            <th width="5%" style="max-width:44px"></th>
                        </tr>
                        </thead>
                        <tbody class="product_list">
                        @isset($shipment)
                            @foreach($shipment->articles as $product)
                                @include(get_template() . '.shipments.dialog.product_element')
                            @endforeach
                        @endisset
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
        <div class="modal-footer" style="white-space: nowrap">

            @if(!$shipment)
            <button name="products" type="button" onclick="{{ $class }}.openProductmodal()" class="button mr-15 uppercase-btn"><i class="fa fa-plus"></i> Добавить товар</button>
            @endif

            <button class="button white mr-15 uppercase-btn" onclick="{{ $class }}.finitaLaComedia()">Закрыть</button>
            {{--<button type="button" class="button primary pull-right mr-15 uppercase-btn" onclick="{{ $class }}.saveAndClose(this)">Сохранить и закрыть</button>--}}

            @if($shipment)
                <button class="dropdown pull-right button" onclick="event.preventDefault(); window.helper.openModal(this, event)">
                    Печать
                    <div class="dropdown_container">
                        <div class="arrow"></div>
                        <span onclick="{{ $class }}.printScore()" class="element">Счёт</span>
                        <span onclick="{{ $class }}.printUpd()" class="element">УПД</span>
                    </div>
                </button>
            @endif

            @if(!isset($shipment) || !$shipment->hasRelations())
                <button type="button" class="button primary pull-right mr-15 uppercase-btn" onclick="{{ $class }}.save(this)">Сохранить</button>
            @endif
        </div>
        <div class="system_message">

        </div>
    </form>

@if(!isset($inner) || !$inner)
</div>
@endif
