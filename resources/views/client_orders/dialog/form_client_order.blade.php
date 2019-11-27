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
    <form class="EntranceStoredListner clientOrderStoredListner WarrantStoredListner" action="{{ route('StoreClientOrder') }}" method="POST">
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
                <div class="row row-sm">
                    <div class="col-sm-6">
                        <div class="row row-sm">
                            <div class="col-sm-12 form-group">
                                <label for="category_id">Покупатель</label>
                                <div class="input-group">
                                    <select name="partner_id" disabled class="partner_select form-control input-c noarrow fake-disabled" readonly>
                                        @if(isset($client_order) && $client_order->partner()->first() != null)
                                            <option value="{{ $client_order->partner()->first()->id }}">{{ $client_order->partner()->first()->outputName() }}</option>
                                        @else
                                            <option>Не выбрано</option>
                                        @endif
                                    </select>
                                    <div class="input-group-append">
                                        <button onclick="{{ $class }}.openSelectPartnermodal()"
                                                class="btn white" type="button"><i class="fa fa-bars"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="@if(isset($client_order)) col-sm-6 @else col-sm-12 @endif form-group">
                                <label for="discount">Скидка</label>
                                <div class="input-group">
                                    <input type="number" name="discount" class="form-control" placeholder="Скидка" @if($client_order) value="{{ $client_order->discount }}" @else value="0" @endif>
                                    <span class="input-group-append">
                                        <div class="input-group-text">
                                          <label class="mb-0 pr-2" for="inpercents">В процентах</label>
                                            <input id="inpercents" name="inpercents" type="checkbox" @if($client_order && $client_order->inpercents) checked @endif>
                                        </div>
                                    </span>
                                </div>
                            </div>
                            @if(isset($client_order))
                                <div class="col-sm-6 form-group">
                                    <label for="discount">Статус заказа</label>
                                    <div class="input-group">
                                        <select name="status" class="form-control">
                                            <option @if($client_order->status === 'active') selected @endif value="active">Активен</option>
                                            <option @if($client_order->status === 'canceled') selected @endif value="canceled">Отменен</option>
                                            <option @if($client_order->status === 'full') selected @endif value="full">Укомплектован</option>
                                            <option @if($client_order->status === 'complete') selected @endif value="complete">Выполнен</option>
                                        </select>
                                    </span>
                                    </div>
                                </div>
                            @endif
                        </div>
                    </div>
                    <div class="col-sm-6 form-group">
                        <label for="comment">Комментарий</label>
                        <textarea style="resize: none;" class="form-control" name="comment" id="comment" cols="30" rows="5">@if(isset($client_order)){{ $client_order->comment }}@endif</textarea>
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
