<div
    @if(isset($client_order) && $client_order->id != NULL)
    @php $class = 'clientorderDialog' . $client_order->id @endphp
    id="clientorderDialog{{$client_order->id}}" data-id="{{$client_order->id}}"
    @else
    @php $class = 'clientorderDialog' @endphp
    id="clientorderDialog"
    @endif
    class="dialog client_order_dialog" style="width:880px;">
    @if(isset($client_order) && $client_order->id != NULL)
        <div class="titlebar">Заказ клиента №{{ $client_order->id }}</div>
    @else
        <div class="titlebar">Новый заказ клиента</div>
    @endif
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>
    <div class="modal-header white" style="justify-content: normal;">
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
                <button class="btn btn-fw success">Принять оплату</button>
            </div>
        @endif
    </div>
    <form action="{{ route('StoreClientOrder') }}" method="POST">
        @csrf
        @if(isset($client_order) && $client_order->id != NULL)
            <input type="hidden" name="id" value="{{ $client_order->id }}">
            <input type="hidden" name="summ" value="{{ $client_order->summ }}">
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
                            <div class="col-sm-12 form-group">
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
                        </div>
                    </div>
                    <div class="col-sm-6 form-group">
                        <label for="comment">Комментарий</label>
                        <textarea style="resize: none;" class="form-control" name="comment" id="comment" cols="30" rows="5">@if(isset($client_order)){{ $client_order->comment }}@endif</textarea>
                    </div>
                </div>
                <div class="form-group">
                    <div for="category_id" class=" mb-3">
                        <b>Список приходных номенклатур</b>
                    </div>

                    <table class="table table-sm table-hover b-t mh40-dialog d-block" data-simplebar>
                        <thead class="text-muted">
                        <tr>
                            <th width="30%">Наименование</th>
                            <th width="10%">Артикул</th>
                            <th width="10%">Производитель</th>
                            <th width="10%">Склад</th>
                            <th width="10%" style="min-width: 60px;">Кол-во</th>
                            <th width="10%" style="min-width: 100px;">Цена</th>
                            <th width="10%" style="min-width: 100px;">Всего</th>
                            <th width="10%"></th>
                        </tr>
                        </thead>
                        <tbody class="product_list">
                        @if(isset($client_order))
                            @foreach($client_order->getArticles() as $product)
                                @include('client_orders.dialog.product_element')
                            @endforeach
                        @endif
                        </tbody>
                    </table>
                    <div class="btn-groups w-100">
                            <button name="products" type="button" onclick="{{ $class }}.openProductmodal()" class="btn btn-fw white"><i class="fa fa-plus"></i> Товар из базы</button>
                            <button name="products" type="button" onclick="{{ $class }}.addQuickProduct()" class="btn btn-fw white"><i class="fa fa-plus"></i> Быстрый товар</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn primary" onclick="{{ $class }}.save(this)">Сохранить</button>
        </div>
        <div class="system_message">

        </div>
    </form>
</div>
