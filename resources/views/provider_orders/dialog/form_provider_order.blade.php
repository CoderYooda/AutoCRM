@php $stores = App\models\Store::owned()->get(); @endphp
<div
    @if(isset($provider_order) && $provider_order->id != NULL)
    @php $class = 'providerorderDialog' . $provider_order->id @endphp
    id="providerorderDialog{{$provider_order->id}}" data-id="{{$provider_order->id}}"
    @else
    @php $class = 'providerorderDialog' @endphp
    id="providerorderDialog"
    @endif
    class="dialog provider_order_dialog" style="width:880px;">
        @if(isset($provider_order) && $provider_order->id != NULL)
            <div class="titlebar">Заявка поставщику №{{ $provider_order->id }}</div>
        @else
            <div class="titlebar">Новая заявка поставщику</div>
        @endif
        <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>
        <div class="modal-header dark" style="justify-content: normal;">
            <div class="b-r pr-3 mr-3">
                <span class="item-title _500">Всего на сумму</span>
                <div class="item-except font-weight-bolder h-1x">
                    <span id="total_price">
                        @if(isset($provider_order)){{ $provider_order->summ }} @else 0.0 @endif
                    </span> р
                </div>
                <div class="item-tag tag hide">
                </div>
            </div>
            <div class="b-r pr-3 mr-3">
                <span class="item-title _500">Скидка</span>
                <div class="item-except font-weight-bolder h-1x">
                    <span id="percents_price">
                        @if(isset($provider_order))
                            {{ $provider_order->discount }}@if($provider_order->inpercents)% @else р @endif
                        @else 0р @endif
                    </span>
                </div>
                <div class="item-tag tag hide">
                </div>
            </div>
            <div class="b-r pr-3 mr-3">
                <span class="item-title _500">Итого</span>
                <div class="item-except font-weight-bolder h-1x">
                    <span id="total_price">
                        @if(isset($provider_order)){{ $provider_order->itogo }} @else 0.0 @endif
                    </span> р
                </div>
                <div class="item-tag tag hide">
                </div>
            </div>
            {{--<div class="b-r pr-3 mr-3">--}}
                {{--<span class="item-title _500">Итого</span>--}}
                {{--<div class="item-except font-weight-bolder h-1x">--}}
                    {{--<span id="itogo_price">--}}
                        {{--@if(isset($provider_order))--}}
                            {{--{{ $provider_order->itogo }}--}}
                        {{--@else 0.0 @endif--}}
                    {{--</span> р--}}
                {{--</div>--}}
                {{--<div class="item-tag tag hide">--}}
                {{--</div>--}}
            {{--</div>--}}
            @if(isset($provider_order))
            <div class="b-r pr-3 mr-3">
                <span class="item-title _500">Оплачено</span>
                <div class="item-except @if($provider_order->getWarrantPositive() === $provider_order->itogo) text-success
                    @elseif($provider_order->getWarrantPositive() > $provider_order->itogo) text-danger @endif font-weight-bolder h-1x">
                    <span id="payed_price">
                        {{ sprintf("%.2f", $provider_order->getWarrantPositive()) }} р / <span id="itogo_price">{{ $provider_order->itogo }}</span> р
                    </span>
                </div>
                <div class="item-tag tag hide">
                </div>
            </div>
            @else
                <div class="b-r pr-3 mr-3">
                    <span class="item-title _500">Итого</span>
                    <div class="item-except font-weight-bolder h-1x">
                    <span id="payed_price">
                        <span id="itogo_price">0</span>р
                    </span>
                    </div>
                </div>
            @endif

            {{--@if(isset($provider_order))--}}
            {{--<div class="b-r pr-3 mr-3">--}}
            {{--<button class="btn btn-fw success">Принять оплату</button>--}}
            {{--</div>--}}
            {{--@endif--}}
            @if(isset($provider_order) && ($provider_order->getWarrantPositive() < $provider_order->itogo) )
                <div class="b-r pr-3 mr-3">
                    <button onclick="{{ $class }}.getPayment()" class="btn btn-fw success">Оплатить</button>
                </div>
            @endif
            @if(isset($provider_order) && ($provider_order->getWarrantPositive() > $provider_order->itogo) )
                <div class="b-r pr-3 mr-3">
                    <button onclick="{{ $class }}.getBackPayment()" class="btn btn-fw success">Вернуть средства</button>
                </div>
            @endif
        </div>
    <form class="WarrantStoredListner providerOrderStoredListner" action="{{ route('StoreProviderOrder') }}" method="POST">
        @csrf
        @if(isset($provider_order) && $provider_order->id != NULL)
            <input type="hidden" name="id" value="{{ $provider_order->id }}">
            <input type="hidden" name="summ" value="{{ $provider_order->summ }}">
            <input type="hidden" name="itogo" value="{{ $provider_order->itogo }}">
            <input type="hidden" name="ostatok" value="{{ $provider_order->itogo - $provider_order->getWarrantPositive() }}">
        @else
            <input type="hidden" name="id" value="">
        @endif

        <input class="partner_select" type="hidden" name="partner_id" value=" @if(isset($provider_order)){{ $provider_order->partner()->first()->id }}@endif">

        <div class="no-gutters align-items-stretch">
            <div class="padding">
                <div class="row row-sm">
                    <div class="col-sm-6">
                        <div class="row row-sm">
                            <div class="col-sm-12">
                                <div class="form-group row">
                                    <label for="partner_id" class="col-sm-3 no-pr col-form-label">Поставщик</label>
                                    <div class="col-sm-9">
                                        <button onclick="{{ $class }}.openSelectPartnermodal()" type="button" name="partner_id" class="partner_select form-control text-left button_select">
                                            @if(isset($provider_order) && $provider_order->partner()->first() != null)
                                                {{ $provider_order->partner()->first()->outputName() }}
                                            @else
                                                <option>Не выбрано</option>
                                            @endif
                                        </button>

                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-3" for="discount">Скидка</label>
                                    <div class="col-sm-9 input-group">
                                        <input onClick="this.select();" type="number" name="discount" class="form-control" placeholder="Скидка" @if($provider_order) value="{{ $provider_order->discount }}" @else value="0" @endif>
                                        <span class="input-group-append">
                                        <div class="input-group-text">
                                          <label class="mb-0 pr-2" for="inpercents">В процентах</label>
                                            <input id="inpercents" name="inpercents" type="checkbox" @if($provider_order && $provider_order->inpercents) checked @else checked @endif>
                                        </div>
                                    </span>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-3">Склад</label>
                                    <div class="col-sm-9">
                                        <select name="store_id" class="form-control input-c">
                                            @foreach($stores as $store)
                                                <option value="{{ $store->id }}" @if(isset($provider_order) && $provider_order->store_id == $store->id) selected @elseif(Auth::user()->partner()->first()->store_id == $store->id) selected @endif>{{ $store->name }}</option>
                                            @endforeach
                                        </select>
                                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 form-group">
                        <textarea placeholder="Комментарий" style="resize: none;" class="form-control" name="comment" id="providerorder_dialog_focused" cols="30" rows="6">@if(isset($provider_order)){{ $provider_order->comment }}@endif</textarea>
                    </div>
                </div>
                <div class="form-group">
                    <div for="category_id" class=" mb-3"><b>Список приходных номенклатур</b>
                        <div class="pull-right checkbox">
                            <b class="pr-2">НДС:</b>
                            <label class="ui-check mb-0 pr-2">
                                <input name="nds" type="checkbox" value="1"
                                       @if(isset($provider_order) && $provider_order->nds) checked
                                       @elseif(isset($provider_order) && !$provider_order->nds)
                                       @else checked @endif
                                       onclick="{{ $class }}.setNDS();">
                                <i class="dark-white"></i>
                                - есть
                            </label>
                            <label class="ui-check mb-0">
                                <input name="nds_included" type="checkbox" value="1"
                                       @if(isset($provider_order) && $provider_order->nds_included) checked
                                       @elseif(isset($provider_order) && !$provider_order->nds_included)
                                       @else checked @endif
                                       onclick="{{ $class }}.setNDS();">
                                <i class="dark-white"></i>
                                - включена в стоимость
                            </label>
                        </div>
                    </div>
                    <div data-simplebar style="max-height: 300px;">
                        <table class="table table-sm table-hover mb-0 b-t mh40-dialog d-block"  style="min-height: 300px">
                            <thead class="text-muted">
                            <tr>
                                <th width="30%">Наименование</th>
                                <th width="10%">Артикул</th>
                                <th width="10%" style="min-width: 60px;">Кол-во</th>
                                <th width="10%" style="min-width: 100px;">Цена</th>
                                <th width="10%" style="min-width: 70px;">НДС, %</th>
                                <th width="10%" style="min-width: 100px;">НДС</th>
                                <th width="10%"></th>
                            </tr>
                            </thead>
                            <tbody class="product_list">
                            @if(isset($provider_order))
                                @foreach($provider_order->articles()->get() as $product)
                                    @include('provider_orders.dialog.product_element')
                                @endforeach
                            @endif
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="input-group">
                <button name="products" type="button" onclick="{{ $class }}.openProductmodal()" class="btn btn-fw white"><i class="fa fa-plus"></i> Добавить товар</button>
            </div>
            <button class="btn white" onclick="{{ $class }}.finitaLaComedia(this)">Закрыть</button>
            <button type="button" class="btn success" onclick="{{ $class }}.save(this)">Сохранить</button>
            <button type="button" class="btn success no-wrap" onclick="{{ $class }}.saveAndClose(this)">Сохранить и закрыть</button>
        </div>
        <div class="system_message">

        </div>
    </form>
</div>
