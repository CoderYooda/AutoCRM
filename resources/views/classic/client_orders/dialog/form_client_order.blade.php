    @if(!$request['fresh'])
        <div
        @if(isset($client_order) && $client_order->id != NULL)
        @php $class = 'clientorderDialog' . $client_order->id @endphp
        id="clientorderDialog{{$client_order->id}}" data-id="{{$client_order->id}}"
        @else
        @php $class = 'clientorderDialog' @endphp
        id="clientorderDialog"
        @endif
        class="dialog client_order_dialog " style="width:1200px">
    @endif
    @if(isset($client_order) && $client_order->id != NULL)
        <div class="titlebar">Заказ клиента №{{ $client_order->id }}</div>
    @else
        <div class="titlebar">Новый заказ клиента</div>
    @endif
        <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>
    <div class="modal-header dark" style="-webkit-justify-content: flex-start;justify-content: normal;">
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
                        @if(isset($client_order)){{ $client_order->summ }} @else 0.00 @endif
                    </span> р
            </div>
            <div class="item-tag tag hide">
            </div>
        </div>
        <div class="modal-alt-header">
            <span class="item-title _500">Скидка</span>
            <div class="item-except font-weight-bolder h-1x">
                    <span id="percents_price">
                        @if(isset($client_order))
                        {{ $client_order->discount }}  @if($client_order->inpercents)% @else р @endif
                        @else 0.00 р @endif
                    </span>
            </div>
            <div class="item-tag tag hide">
            </div>
        </div>
        <div class="modal-alt-header">
            <span class="item-title _500">Итого</span>
            <div class="item-except font-weight-bolder h-1x">
                    <span class="itogo_price">
                        @if(isset($client_order))
                            {{ $client_order->itogo }}
                        @else 0.00 @endif
                    </span> р
            </div>
            <div class="item-tag tag hide">
            </div>
        </div>
        @if(isset($client_order))
        <div class="modal-alt-header">
            <span class="item-title _500">Дата оформления</span>
            <div class="item-except font-weight-bolder h-1x">
                    <span>
                            {{ $client_order->data() }}
                    </span>
            </div>
            <div class="item-tag tag hide">
            </div>
        </div>
        @endif

        @if(isset($client_order))
        <div class="modal-alt-header">
            <span class="item-title _500">Факт / План</span>
            <div class="item-except @if($client_order->wsumm >= $client_order->itogo) text-success @endif font-weight-bolder h-1x">
                    <span id="payed_price">
        {{ sprintf("%.2f", $client_order->wsumm) }} р / <span class="itogo_price">{{ $client_order->itogo }}</span> р
                    </span>
            </div>
            <div class="item-tag tag hide">
            </div>
        </div>
        @endif

        @if(isset($client_order) && !$client_order->isFinished())
            <div class="modal-alt-header">
                <span class="item-title _500">Состояние заказа</span>
                <div class="item-except font-weight-bolder h-1x">
                    <span id="itogo_price">@if($client_order->total_complited)Укомплектован@elseНеукомплектован@endif</span>
                </div>
                <div class="item-tag tag hide">
                </div>
            </div>
        @endif
        @if(isset($client_order) && ($client_order->wsumm < $client_order->itogo) )
            <div class="modal-alt-header">
                <button onclick="{{ $class }}.getPayment()" class="button success uppercase-btn">Принять оплату</button>
            </div>
        @endif
        @if(isset($client_order) && ($client_order->wsumm > $client_order->itogo) )
            <div class="modal-alt-header">
                <button onclick="{{ $class }}.getBackPayment()" class="button success uppercase-btn">Вернуть средства</button>
            </div>
        @endif
    </div>
    <form class="ShipmentStoredListner EntranceStoredListner AdjustmentStoredListner WarrantStoredListner clientOrderSMSListner" onsubmit="console.log(123);" action="{{ route('StoreClientOrder') }}" method="POST">
        <div class="box-body">
            @csrf
            @if(isset($client_order) && $client_order->id != NULL)
                <input type="hidden" name="id" value="{{ $client_order->id }}">
                <input type="hidden" name="summ" value="{{ $client_order->summ }}">
                <input type="hidden" name="itogo" value="{{ $client_order->itogo }}">
                <input type="hidden" name="ostatok" value="{{ $client_order->itogo - $client_order->wsumm }}">
            @else
                <input type="hidden" name="id" value="">
            @endif
            <input id="inpercents" name="inpercents" type="hidden" @if($client_order && $client_order->inpercents) value="1" @else value="0" @endif>
            <input class="partner_select" type="hidden" name="partner_id" value=" @if(isset($client_order)){{ $client_order->partner()->first()->id }}@endif">


            <div class="row row-sm">
                <div class="col-sm-6">

                    <div class="form-group row row-sm">
                        <label for="partner_id" class="col-sm-3 no-pr col-form-label">Заказчик</label>
                        <div class="col-sm-9">
                            <button onclick="{{ $class }}.openSelectPartnermodal()" type="button" name="partner_id" class="partner_select form-control text-left button_select">
                                @if(isset($client_order) && $client_order->partner()->first() != null)
                                    {{ $client_order->partner()->first()->outputName() }}
                                @else
                                    Не выбрано
                                @endif
                            </button>
                        </div>
                    </div>

                    <div class="form-group row row-sm">
                        <label class="col-sm-3" for="discount">Скидка</label>
                        <div class="col-sm-9 input-group">
                            <input onClick="this.select();" type="number" name="discount" class="form-control" placeholder="Скидка" @if($client_order) value="{{ $client_order->discount }}" @else value="0" @endif>
                            <span class="input-group-append">
                                <div class="dropdown" onclick="window.helper.openModal(this, event)">
                                    <div class="drop-butt"><span id="inpercents_text"> @if(isset($client_order) && $client_order->inpercents)в процентах@elseв рублях@endif</span> <i class="fa fa-chevron-down" aria-hidden="true"></i></div>
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
                        <label class="col-sm-3" for="phone">Телефон</label>
                        {{--<div class="col-sm-9 input-group">--}}
                        {{--<input type="text" name="phone" class="form-control phone_input" placeholder="Телефон" @if($client_order) value="{{ $client_order->phone }}" @else value="0" @endif>--}}
                        {{--</div>--}}
                        <div class="col-sm-9 input-group">
                            <input id="client-phone" type="text" name="phone" class="form-control phone_input" placeholder="Телефон" @if($client_order) value="{{ $client_order->phone }}" @else value="0" @endif>
                            <span class="input-group-append">
                                <div class="dropdown" onclick="window.helper.openModal(this, event)">
                                    <div class="drop-butt"><span>Номера контакта</span> <i class="fa fa-chevron-down" aria-hidden="true"></i></div>
                                    <div class="dropdown_container">
                                        <div class="arrow"></div>
                                        <div id="phones-list">
                                            @if(isset($client_order))
                                                    @forelse($client_order->partner()->first()->phones()->get() as $phone)
                                                        <span onclick="{{ $class }}.selectNumber(this)" data-number="{{ $phone->number }}" class="element">{{ $phone->number }}</span>
                                                    @empty
                                                    <div class="no-result">
                                                        <div class="text-center">
                                                            Номеров нет
                                                        </div>
                                                    </div>
                                                    @endforelse
                                                @else
                                                 <div class="no-result">
                                                    <div class="text-center">
                                                        Выберите контакт
                                                    </div>
                                                 </div>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            </span>
                            {{--<div class="input-group-append">--}}
                                {{--<button class="btn white dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Номера контактов</button>--}}
                                {{--<div id="phones-list" class="dropdown-menu" x-placement="bottom-start" style="position: absolute; transform: translate3d(619px, 33px, 0px); top: 0px; left: 0px; will-change: transform;">--}}
                                    {{--@if(isset($client_order))--}}
                                        {{--@forelse($client_order->partner()->first()->phones()->get() as $phone)--}}
                                            {{--<a onclick="{{ $class }}.selectNumber(this)" data-number="{{ $phone->number }}" class="dropdown-item pointer">{{ $phone->number }}</a>--}}
                                        {{--@empty--}}
                                            {{--<div class="no-result">--}}
                                                {{--<div class="text-center">--}}
                                                    {{--Номеров нет--}}
                                                {{--</div>--}}
                                            {{--</div>--}}
                                        {{--@endforelse--}}
                                    {{--@else--}}
                                        {{--<div class="no-result">--}}
                                            {{--<div class="text-center">--}}
                                                {{--Выберите контакт--}}
                                            {{--</div>--}}
                                        {{--</div>--}}
                                    {{--@endif--}}
                                {{--</div>--}}
                            {{--</div>--}}
                        </div>
                    </div>

                    @if(isset($client_order))
                    <div class="form-group row row-sm">
                        <label class="col-sm-3" for="discount">Статус заказа</label>
                        <div class="col-sm-9 input-group">
                            <select name="status" class="form-control" @if(!isset($client_order)) disabled="" @endif>
                                <option @if($client_order->status === 'active') selected @endif value="active">Активен</option>
                                <option @if($client_order->status === 'full') selected @endif value="active">Укомплектован</option>
                                <option @if($client_order->status === 'canceled') selected @endif value="canceled">Отменен</option>
                                {{--<option @if($client_order->status === 'full') selected @endif value="full">Укомплектован</option>--}}
                                <option @if($client_order->status === 'complete') selected @endif value="complete">Выполнен</option>
                            </select>
                        </div>
                    </div>
                    @endif
                    <div class="form-group row row-sm">
                        <div class="col-sm-12">
                            <textarea placeholder="Комментарий" style="resize: none;" class="form-control" name="comment" id="clientorder_dialog_focused" cols="30" rows="5">@if(isset($client_order)){{ $client_order->comment }}@endif</textarea>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 form-group no-pl intabs @if(!isset($client_order)) hide @endif">
                    <div class="b-b nav-active-bg">
                        <ul class="nav nav-tabs" id="cl_tabs">
                            <li class="nav-item active">
                                <a class="nav-link" href="#tab4" data-toggle="tab" data-target="#tab4">SMS сообщения</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#tab5" data-toggle="tab" data-target="#tab5">Платежи</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#tab6" data-toggle="tab" data-target="#">Продажи</a>
                            </li>
                        </ul>
                    </div>

                    <div class="tab-content p-0" >
                        <div class="tab-pane active" id="tab4">
                            @if(isset($client_order))
                                <div class="d-flex flex-column flex" id="chat-list">
                                    <div class="hover">
                                        <div class="pt-3 pb-3">
                                            <div class="chat-list" data-simplebar style="height: 130px">
                                                @forelse($client_order->smsMessages()->get() as $smsMessage)
                                                    @include(env('DEFAULT_THEME', 'classic') . '.client_orders.dialog.sms_message')
                                                @empty
                                                    <div class="no-result">
                                                        <div class="p-4 text-center">
                                                            Сообщений не было отправлено
                                                        </div>
                                                    </div>
                                                @endforelse
                                            </div>
                                            <div class="hide">
                                                <div class="chat-item" id="chat-item" data-class="">
                                                    <a href="#" class="avatar w-40" data-pjax-state="">
                                                        <img class="image" src="" alt=".">
                                                    </a>
                                                    <div class="chat-body">
                                                        <div class="chat-content rounded msg"></div>
                                                        <div class="chat-date date"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="white lt mt-auto">
                                        <div class="input-group">
                                            <input id="sms_field" type="text" class="form-control" placeholder="SMS сообщение клиенту">
                                            <span class="input-group-append">
                                                <button onclick="{{ $class }}.sendSMS()" class="button" type="button" id="newBtn">
                                                    <i class="fa fa-send text-success"></i>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            @else
                                <div class="no-result">
                                    <div class="p-4 text-center">
                                        Сообщений не было отправлено
                                    </div>
                                </div>
                            @endif
                        </div>
                        <div class="tab-pane" id="tab5" data-simplebar style="height: 192px">
                            <div class="list-group">
                                @if(isset($client_order))
                                    @forelse($client_order->warrants()->get() as $warrant)
                                        <a onclick="openDialog('warrantDialog', '&warrant_id={{ $warrant->id }}')" href="#" class="list-group-item no-border-radius">
                                                    <span class="float-right text-right @if($warrant->isIncoming) text-success @else text-primary @endif w-128 pr-2" >
                                                        {{ $warrant->summ }} р. <i class="fa @if($warrant->isIncoming) fa-level-up @else fa-level-down @endif "></i>
                                                    </span>
                                            <span class="float-right ">{{ $warrant->normalizedData() }}</span>
                                            {{ $warrant->getName() }}
                                        </a>
                                    @empty
                                        <div class="no-result">
                                            <div class="p-4 text-center">
                                                Платежей по данному заказу не совершалось.
                                            </div>
                                        </div>
                                    @endforelse
                                @else
                                    <div class="no-result">
                                        <div class="p-4 text-center">
                                            Сохраните заказ для продолжения
                                        </div>
                                    </div>
                                @endif
                            </div>
                        </div>
                        <div class="tab-pane" id="tab6" data-simplebar style="height: 192px">
                            <div class="list-group">
                                @if(isset($client_order))
                                    @forelse($client_order->shipments as $shipment)
                                        <a onclick="openDialog('shipmentDialog', '&shipment_id={{ $shipment->id }}')" href="#" class="list-group-item no-border-radius">
                                                    <span class="float-right text-right text-primary w-128 pr-2" >
                                                        {{ $shipment->id }}
                                                    </span>
                                            <span class="float-right ">{{ $shipment->created_at }}</span>
                                            {{ $shipment->id }}
                                        </a>
                                    @empty
                                        <div class="no-result">
                                            <div class="p-4 text-center">
                                                Продаж по данному заказу не совершалось.
                                            </div>
                                        </div>
                                    @endforelse
                                @else
                                    <div class="no-result">
                                        <div class="p-4 text-center">
                                            Сохраните заказ для продолжения
                                        </div>
                                    </div>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="form-group">
                <div for="category_id" class="mb-15"><b>Список приходных номенклатур</b>
                </div>
                <div data-simplebar style="max-height: 300px;">
                    <table class="table-modal" >
                        <thead class="text-muted">
                        <tr>
                            <th width="80px">Наличие</th>
                            <th width="30%">Наименование</th>
                            <th width="10%">Артикул</th>
                            <th width="10%">Производитель</th>
                            <th width="10%" style="min-width: 60px;">Кол-во</th>
                            <th width="10%" style="min-width: 60px;">Отгружено</th>
                            <th width="10%" style="min-width: 100px;">Цена</th>
                            <th width="10%" style="min-width: 100px;">Всего</th>
                            <th width="10%"></th>
                        </tr>
                        </thead>
                        <tbody class="product_list">
                            @if(isset($client_order))
                                @foreach($client_order->articles as $product)
                                    @include(env('DEFAULT_THEME', 'classic') . '.client_orders.dialog.product_element')
                                @endforeach
                            @endif
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal-footer" style="white-space: nowrap">
            <button name="products" type="button" onclick="{{ $class }}.openProductmodal()" class="button primary uppercase-btn mr-15"><i class="fa fa-plus"></i> Добавить товар</button>
{{--            <button name="products" type="button" onclick="{{ $class }}.addQuickProduct()" class="button primary uppercase-btn mr-15"><i class="fa fa-plus"></i> Быстрый товар</button>--}}

            <button type="button" class="button white uppercase-btn" onclick="{{ $class }}.finitaLaComedia()">Закрыть</button>

            <button type="button" class="button primary pull-right uppercase-btn" onclick="{{ $class }}.saveAndClose(this)">Сохранить и закрыть</button>
            <button type="button" class="button primary pull-right uppercase-btn mr-15" onclick="{{ $class }}.save(this)">Сохранить</button>
            @if(isset($client_order) && $client_order->id != NULL)
                <button type="button" class="button primary pull-right uppercase-btn mr-15" onclick="window.helper.printDocument('client-order', {{ $client_order->id }})" >Печать</button>
            @endif
            @if(isset($client_order) && $client_order->id != NULL && !$client_order->IsAllProductsShipped())
                <button type="button" class="button primary pull-right uppercase-btn  mr-15" onclick="{{ $class }}.openShipmentModal()">Отгрузка</button>
            @endif


        </div>
        <div class="system_message">

        </div>
    </form>
@if(!$request['fresh'])
    </div>
@endif
