    @if(!$request['fresh'])
        <div
        @if(isset($client_order) && $client_order->id != NULL)
        @php $class = 'clientorderDialog' . $client_order->id @endphp
        id="clientorderDialog{{$client_order->id}}" data-id="{{$client_order->id}}"
        @else
        @php $class = 'clientorderDialog' @endphp
        id="clientorderDialog"
        @endif
        class="dialog client_order_dialog " style="width:1100px">
    @endif
    @if(isset($client_order) && $client_order->id != NULL)
        <div class="titlebar">Заказ клиента №{{ $client_order->id }}</div>
    @else
        <div class="titlebar">Новый заказ клиента</div>
    @endif
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>
    <div class="modal-header dark" style="-webkit-justify-content: flex-start;justify-content: normal;">
        {{--<div class="b-r pr-3 mr-3">--}}
            {{--<span class="item-title _500">Поступление</span>--}}
            {{--<div class="item-except text-sm h-1x font-weight-bolder">--}}
                {{--@if(isset($client_order) && $client_order->id != NULL)--}}
                    {{--№{{ $client_order->id }}--}}
                {{--@else--}}
                    {{--Новое--}}
                {{--@endif--}}
            {{--</div>--}}
        {{--</div>--}}
        <div class="b-r pr-3 mr-3">
            <span class="item-title _500">Магазин</span>
            <div class="item-except font-weight-bolder h-1x">
                    <span id="store_selected">
                        {{ Auth::user()->getStoreFirst()->name }}
                    </span>
            </div>
            <div class="item-tag tag hide">
            </div>
        </div>
        <div class="b-r pr-3 mr-3">
            <span class="item-title _500">Всего на сумму</span>
            <div class="item-except font-weight-bolder h-1x">
                    <span id="total_price">
                        @if(isset($client_order)){{ $client_order->summ }} @else 0.0 @endif
                    </span> р
            </div>
            <div class="item-tag tag hide">
            </div>
        </div>
        <div class="b-r pr-3 mr-3">
            <span class="item-title _500">Скидка</span>
            <div class="item-except font-weight-bolder h-1x">
                    <span id="percents_price">
                        @if(isset($client_order))
                        {{ $client_order->discount }}  @if($client_order->inpercents)% @else р @endif
                        @else 0 р @endif
                    </span>
            </div>
            <div class="item-tag tag hide">
            </div>
        </div>
        <div class="b-r pr-3 mr-3">
            <span class="item-title _500">Итого</span>
            <div class="item-except font-weight-bolder h-1x">
                    <span id="itogo_price">
                        @if(isset($client_order))
                            {{ $client_order->itogo }}
                        @else 0.0 @endif
                    </span> р
            </div>
            <div class="item-tag tag hide">
            </div>
        </div>
        @if(isset($client_order))
        <div class="b-r pr-3 mr-3">
            <span class="item-title _500">Дата оформления</span>
            <div class="item-except font-weight-bolder h-1x">
                    <span id="itogo_price">
                            {{ $client_order->data() }}
                    </span>
            </div>
            <div class="item-tag tag hide">
            </div>
        </div>
        @endif

        @if(isset($client_order))
        <div class="b-r pr-3 mr-3">
            <span class="item-title _500">Оплачено</span>
            <div class="item-except @if($client_order->getWarrantPositive() >= $client_order->itogo) text-success @endif font-weight-bolder h-1x">
                    <span id="payed_price">
        {{ sprintf("%.2f", $client_order->getWarrantPositive()) }} р / {{ $client_order->itogo }} р
                    </span>
            </div>
            <div class="item-tag tag hide">
            </div>
        </div>
        @endif

        @if(isset($client_order))
            <div class="b-r pr-3 mr-3">
                <span class="item-title _500">Состояние заказа</span>
                <div class="item-except font-weight-bolder h-1x">
                    <span id="itogo_price">@if($client_order->total_complited)Укомплектован@elseНеукомплектован@endif</span>
                </div>
                <div class="item-tag tag hide">
                </div>
            </div>
        @endif
        @if(isset($client_order) && ($client_order->getWarrantPositive() < $client_order->itogo) )
            <div class="b-r pr-3 mr-3">
                <button onclick="{{ $class }}.getPayment()" class="btn btn-fw success">Принять оплату</button>
            </div>
        @endif
        @if(isset($client_order) && ($client_order->getWarrantPositive() > $client_order->itogo) )
            <div class="b-r pr-3 mr-3">
                <button onclick="{{ $class }}.getBackPayment()" class="btn btn-fw success">Вернуть средства</button>
            </div>
        @endif
    </div>
    <form class="EntranceStoredListner clientOrderStoredListner WarrantStoredListner clientOrderSMSListner" action="{{ route('StoreClientOrder') }}" method="POST">
        @csrf
        @if(isset($client_order) && $client_order->id != NULL)
            <input type="hidden" name="id" value="{{ $client_order->id }}">
            <input type="hidden" name="summ" value="{{ $client_order->summ }}">
            <input type="hidden" name="itogo" value="{{ $client_order->itogo }}">
            <input type="hidden" name="ostatok" value="{{ $client_order->itogo - $client_order->getWarrantPositive() }}">
        @else
            <input type="hidden" name="id" value="">
        @endif
        <input class="partner_select" type="hidden" name="partner_id" value=" @if(isset($client_order)){{ $client_order->partner()->first()->id }}@endif">

        <div class="no-gutters align-items-stretch">
            <div class="padding">
                <div class="row">
                    <div class="col-sm-6">

                        <div class="form-group row">
                            <label for="partner_id" class="col-sm-3 no-pr col-form-label">Контрагент</label>
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

                        <div class="form-group row">
                            <label class="col-sm-3" for="discount">Скидка</label>
                            <div class="col-sm-9 input-group">
                                <input type="number" name="discount" class="form-control" placeholder="Скидка" @if($client_order) value="{{ $client_order->discount }}" @else value="0" @endif>
                                <span class="input-group-append">
                                        <div class="input-group-text">
                                          <label class="mb-0 pr-2" for="inpercents">В процентах</label>
                                            <input id="inpercents" name="inpercents" type="checkbox" @if($client_order && $client_order->inpercents) checked @endif>
                                        </div>
                                    </span>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3" for="phone">Телефон</label>
                            {{--<div class="col-sm-9 input-group">--}}
                                {{--<input type="text" name="phone" class="form-control phone_input" placeholder="Телефон" @if($client_order) value="{{ $client_order->phone }}" @else value="0" @endif>--}}
                            {{--</div>--}}
                            <div class="col-sm-9 input-group">
                                <input id="client-phone" type="text" name="phone" class="form-control phone_input" placeholder="Телефон" @if($client_order) value="{{ $client_order->phone }}" @else value="0" @endif>

                                <div class="input-group-append">
                                    <button class="btn white dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Номера контрагента</button>
                                    <div id="phones-list" class="dropdown-menu" x-placement="bottom-start" style="position: absolute; transform: translate3d(619px, 33px, 0px); top: 0px; left: 0px; will-change: transform;">
                                        @if(isset($client_order))
                                            @forelse($client_order->partner()->first()->phones()->get() as $phone)
                                                <a onclick="{{ $class }}.selectNumber(this)" data-number="{{ $phone->number }}" class="dropdown-item pointer">{{ $phone->number }}</a>
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
                                                    Выберите контрагента
                                                </div>
                                            </div>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3" for="discount">Статус заказа</label>
                            <div class="col-sm-9 input-group">
                                <select name="status" class="form-control" @if(!isset($client_order)) disabled="" @endif>
                                    @if(isset($client_order))
                                    <option @if($client_order->status === 'active') selected @endif value="active">Активен</option>
                                    <option @if($client_order->status === 'canceled') selected @endif value="canceled">Отменен</option>
                                    <option @if($client_order->status === 'full') selected @endif value="full">Укомплектован</option>
                                    <option @if($client_order->status === 'complete') selected @endif value="complete">Выполнен</option>
                                    @else
                                        <option selected value="">Не определено</option>
                                    @endif
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <textarea placeholder="Комментарий" style="resize: none;" class="form-control" name="comment" id="comment" cols="30" rows="5">@if(isset($client_order)){{ $client_order->comment }}@endif</textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 form-group no-pl intabs">
                        <div class="b-b nav-active-bg">
                            <ul class="nav nav-tabs">
                                <li class="nav-item">
                                    <a class="nav-link active" href="#" data-toggle="tab" data-target="#tab4">SMS сообщения</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#" data-toggle="tab" data-target="#tab5">Платежи</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#" data-toggle="tab" data-target="#tab6">История</a>
                                </li>
                            </ul>
                        </div>

                        <div class="tab-content p-0" >
                            <div class="tab-pane active" id="tab4">
                                <div class="d-flex flex-column flex" id="chat-list">
                                    <div class="hover">
                                        <div class="pt-3 pb-3">
                                            <div class="chat-list" data-simplebar style="height: 215px">
                                                @if(isset($client_order))
                                                    @forelse($client_order->smsMessages()->get() as $smsMessage)
                                                        @include('client_orders.dialog.sms_message')
                                                    @empty
                                                        <div class="no-result">
                                                            <div class="p-4 text-center">
                                                                Сообщений не было отправлено
                                                            </div>
                                                        </div>
                                                    @endforelse
                                                @else
                                                    <div class="no-result">
                                                        <div class="p-4 text-center">
                                                            Сообщений не было отправлено
                                                        </div>
                                                    </div>
                                                @endif
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
                                                <button onclick="{{ $class }}.sendSMS()" class="btn white b-a no-shadow" type="button" id="newBtn">
                                                    <i class="fa fa-send text-success"></i>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="tab5" data-simplebar style="height: 281px">
                                <div class="list-group box mb-0 no-border-radius">
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
                            <div class="tab-pane" id="tab6">
                                <div class="pt-3 pb-3">
                                    <div class="streamline streamline-xs streamline-dotted" data-simplebar style="height: 249px">
                                        <div class="sl-item b-info">
                                            <div class="sl-content">
                                                <div class="sl-date text-muted">2 minutes ago</div>
                                                <p>Смена статуса заказа</p>
                                            </div>
                                        </div>
                                        <div class="sl-item b-success">
                                            <div class="sl-content">
                                                <div class="sl-date text-muted">9:30</div>
                                                <p>Товары добавлены к заказу</p>
                                            </div>
                                        </div>
                                        <div class="sl-item b-primary">
                                            <div class="sl-content">
                                                <div class="sl-date text-muted">8:30</div>
                                                <p>Заказ создан</p>
                                                    {{--<a href="#" class="text-info">Jacob</a> and discuss the detail.--}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group mb-0">
                    <div for="category_id" class=" mb-3">
                        <b>Список приходных номенклатур</b>
                    </div>

                    <table class="table table-sm table-hover b-t mh40-dialog d-block mb-0" data-simplebar style="min-height: 200px">
                        <thead class="text-muted">
                        <tr>
                            <th width="30%">Наличие</th>
                            <th width="30%">Наименование</th>
                            <th width="10%">Артикул</th>
                            <th width="10%">Производитель</th>
                            <th width="10%" style="min-width: 60px;">Кол-во</th>
                            <th width="10%" style="min-width: 100px;">Цена</th>
                            <th width="10%" style="min-width: 100px;">Всего</th>
                            <th width="10%"></th>
                        </tr>
                        </thead>
                        <tbody class="product_list">
                        @if(isset($client_order))
                            @foreach($client_order->articles as $product)
                                @include('client_orders.dialog.product_element')
                            @endforeach
                        @endif
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
        <div class="modal-footer" style="white-space: nowrap">
            <div class="btn-groups w-100">
                <button name="products" type="button" onclick="{{ $class }}.openProductmodal()" class="btn btn-fw white"><i class="fa fa-plus"></i> Товар из базы</button>
                <button name="products" type="button" onclick="{{ $class }}.addQuickProduct()" class="btn btn-fw white"><i class="fa fa-plus"></i> Быстрый товар</button>
            </div>
            <button class="btn white" onclick="{{ $class }}.finitaLaComedia(this)">Закрыть</button>
            <button type="button" class="btn success" onclick="{{ $class }}.save(this)">Сохранить</button>
            <button type="button" class="btn success" onclick="{{ $class }}.saveAndClose(this)">Сохранить и закрыть</button>

        </div>
        <div class="system_message">

        </div>
    </form>
@if(!$request['fresh'])
    </div>
@endif
