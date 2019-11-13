<div
    @if(isset($shipment) && $shipment->id != NULL)
    @php $class = 'shipmentDialog' . $shipment->id @endphp
    id="shipmentDialog{{$shipment->id}}" data-id="{{$shipment->id}}"
    @else
    @php $class = 'shipmentDialog' @endphp
    id="shipmentDialog"
    @endif
    class="dialog shipment_dialog" style="width:880px;">
    @if(isset($shipment) && $shipment->id != NULL)
        <div class="titlebar">Продажа №{{ $shipment->id }}</div>
    @else
        <div class="titlebar">Новая продажа</div>
    @endif
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>
    <div class="modal-header dark" style="justify-content: normal;">
        {{--<div class="b-r pr-3 mr-3">--}}
            {{--<span class="item-title _500">Поступление</span>--}}
            {{--<div class="item-except text-sm h-1x font-weight-bolder">--}}
                {{--@if(isset($shipment) && $shipment->id != NULL)--}}
                    {{--№{{ $shipment->id }}--}}
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
                        @if(isset($shipment)){{ $shipment->summ }} @else 0.0 @endif
                    </span> р
            </div>
            <div class="item-tag tag hide">
            </div>
        </div>
        <div class="b-r pr-3 mr-3">
            <span class="item-title _500">Скидка</span>
            <div class="item-except font-weight-bolder h-1x">
                    <span id="percents_price">
                        @if(isset($shipment))
                        {{ $shipment->discount }}  @if($shipment->inpercents)% @else р @endif
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
                        @if(isset($shipment))
                            {{ $shipment->itogo }}
                        @else 0.0 @endif
                    </span> р
            </div>
            <div class="item-tag tag hide">
            </div>
        </div>

        @if(isset($shipment))
            <div class="b-r pr-3 mr-3">
                <span class="item-title _500">Оплачено</span>
                <div class="item-except @if($shipment->warrants()->sum('summ') >= $shipment->itogo) text-success @endif font-weight-bolder h-1x">
                    <span id="payed_price">
        {{ sprintf("%.2f", $shipment->warrants()->sum('summ')) }} р / {{ $shipment->itogo }} р
                    </span>
                </div>
                <div class="item-tag tag hide">
                </div>
            </div>
        @endif

        @if(isset($shipment) && ($shipment->warrants()->sum('summ') < $shipment->itogo))
            <div class="b-r pr-3 mr-3">
                <button onclick="{{ $class }}.getPayment()" class="btn btn-fw success">Принять оплату</button>
            </div>
        @endif
    </div>
    <form class="WarrantStoredListner" action="{{ route('StoreShipment') }}" method="POST">
        @csrf
        @if(isset($shipment) && $shipment->id != NULL)
            <input type="hidden" name="id" value="{{ $shipment->id }}">
            <input type="hidden" name="summ" value="{{ $shipment->summ }}">
            <input type="hidden" name="itogo" value="{{ $shipment->itogo }}">
            <input type="hidden" name="ostatok" value="{{ $shipment->itogo - $shipment->warrants()->sum('summ') }}">
        @else
            <input type="hidden" name="id" value="">
        @endif
        <input type="hidden" name="store_id" value="{{ Auth::user()->getStoreFirst()->id }}">
        <input class="partner_select" type="hidden" name="partner_id" value=" @if(isset($shipment)){{ $shipment->partner()->first()->id }}@endif">

        <div class="no-gutters align-items-stretch">
            <div class="padding">
                <div class="row row-sm">
                    <div class="col-sm-6">
                        <div class="row row-sm">
                            <div class="col-sm-12 form-group">
                                <label for="category_id">Покупатель</label>
                                <div class="input-group">
                                    <select name="partner_id" disabled class="partner_select form-control input-c noarrow fake-disabled" readonly>
                                        @if(isset($shipment) && $shipment->partner()->first() != null)
                                            <option value="{{ $shipment->partner()->first()->id }}">{{ $shipment->partner()->first()->outputName() }}</option>
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
                                    <input type="number" name="discount" class="form-control" placeholder="Скидка" @if($shipment) value="{{ $shipment->discount }}" @else value="0" @endif>
                                    <span class="input-group-append">
                                        <div class="input-group-text">
                                          <label class="mb-0 pr-2" for="inpercents">В процентах</label>
                                            <input id="inpercents" name="inpercents" type="checkbox" @if($shipment && $shipment->inpercents) checked @endif>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 form-group">
                        <label for="comment">Комментарий</label>
                        <textarea style="resize: none;" class="form-control" name="comment" id="comment" cols="30" rows="5">@if(isset($shipment)){{ $shipment->comment }}@endif</textarea>
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
                            <th width="10%" style="min-width: 60px;">Кол-во</th>
                            <th width="10%" style="min-width: 100px;">Цена</th>
                            <th width="10%" style="min-width: 100px;">Всего</th>
                            <th width="10%"></th>
                        </tr>
                        </thead>
                        <tbody class="product_list">
                        @if(isset($shipment))
                            @foreach($shipment->articles()->get() as $product)
                                @include('shipments.dialog.product_element')
                            @endforeach
                        @endif
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal-footer" style="white-space: nowrap">
            <div class="btn-groups w-100">
                <button name="products" type="button" onclick="{{ $class }}.openProductmodal()" class="btn btn-fw white"><i class="fa fa-plus"></i> Добавить товар</button>
            </div>
            <button class="btn white" onclick="{{ $class }}.finitaLaComedia(this)">Закрыть</button>
            <button type="button" class="btn success" onclick="{{ $class }}.save(this)">Сохранить</button>
            <button type="button" class="btn success" onclick="{{ $class }}.saveAndClose(this)">Сохранить и закрыть</button>
        </div>
        <div class="system_message">

        </div>
    </form>
</div>
