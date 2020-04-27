    @if(!$request['fresh'])
        <div
        @if(isset($refund) && $refund->id != NULL)
        @php $class = 'refundDialog' . $refund->id @endphp
        id="refundDialog{{$refund->id}}" data-id="{{$refund->id}}"
        @else
        @php $class = 'refundDialog' @endphp
        id="refundDialog"
        @endif
        class="dialog refund_dialog " style="width:880px">
    @endif
    @if(isset($refund) && $refund->id != NULL)
        <div class="titlebar">Возврат №{{ $refund->id }}</div>
    @else
        <div class="titlebar">Новый возврат</div>
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
        @if(isset($refund))
        <div class="modal-alt-header">
            <span class="item-title _500">Дата оформления</span>
            <div class="item-except font-weight-bolder h-1x">
                    <span>
{{--                            {{ $refund->data() }}--}}
                    </span>
            </div>
            <div class="item-tag tag hide">
            </div>
        </div>
        @endif
    </div>
    <form class="RefundStoredListner" onsubmit="console.log(123);" action="{{ route('StoreRefund') }}" method="POST">
        <div class="box-body">
            @csrf
            @if(isset($refund) && $refund->id != NULL)
                <input type="hidden" name="id" value="{{ $refund->id }}">
            @else
                <input type="hidden" name="id" value="">
            @endif
            <input class="shipment_select" type="hidden" name="shipment_id" value=" @if(isset($refund)){{ $refund->shipment()->first()->id }}@endif">

            <div class="row row-sm">
                <div class="col-sm-6">
                    <div class="form-group row row-sm">
                        <label for="partner_id" class="col-sm-5 no-pr col-form-label">Возврат по продаже</label>
                        <div class="col-sm-7">
                            <button onclick="{{ $class }}.openSelectShipmentModal()" type="button" name="shipment_id" class="shipment_select form-control text-left button_select">
                                @if(isset($refund) && $refund->shipmnet()->first() != null)
                                    {{ $refund->shipment()->first()->outputName() }}
                                @else
                                    Не выбрано
                                @endif
                            </button>
                        </div>
                    </div>
                    <div class="form-group row row-sm">
                        <label class="col-sm-5" for="discount">Покупатель</label>
                        <div class="col-sm-7 input-group">
                            <input type="text" name="partner_id" value="@if(isset($refund) && $refund->shipmnet()->first() != null) {{ $refund->shipment->partner->outputName() }} @else не указан @endif" class="form-control" disabled="disabled">
                        </div>
                    </div>
                    <div class="form-group row row-sm">
                        <label class="col-sm-5" for="discount">Ответственный</label>
                        <div class="col-sm-7 input-group">
                            <input type="text" value="{{ Auth::user()->partner->outputName() }}" class="form-control" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group row row-sm">
                        <div class="col-sm-12">
                            <textarea placeholder="Комментарий" style="resize: none;height: 128px;" class="form-control" name="comment" id="comment" cols="30" rows="5">@if(isset($refund)){{ $refund->comment }}@endif</textarea>
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
                            <th width="30%">Наименование</th>
                            <th width="10%">Артикул</th>
                            <th width="10%" style="min-width: 60px;">Кол-во</th>
                            <th width="10%" style="min-width: 100px;">Цена</th>
                            <th width="10%" style="min-width: 100px;">Всего</th>
                            <th width="5%" style="max-width:44px"></th>
                        </tr>
                        </thead>
                        <tbody class="product_list">
{{--                        @if(isset($refund))--}}
{{--                            @foreach($refund->articles as $product)--}}
{{--                                @include(env('DEFAULT_THEME', 'classic') . '.refunds.dialog.product_element')--}}
{{--                            @endforeach--}}
{{--                        @endif--}}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal-footer" style="white-space: nowrap">
            <button type="button" class="button white uppercase-btn" onclick="{{ $class }}.finitaLaComedia()">Закрыть</button>
            <button type="button" class="button primary pull-right uppercase-btn" onclick="{{ $class }}.saveAndClose(this)">Сохранить и закрыть</button>
            <button type="button" class="button primary pull-right uppercase-btn mr-15" onclick="{{ $class }}.save(this)">Сохранить</button>
            @if(isset($refund))
                <button type="button" class="button primary pull-right uppercase-btn mr-15" onclick="window.helper.printDocument('client-order', {{ $refund->id }})" >Печать</button>
            @endif


        </div>
        <div class="system_message">

        </div>
    </form>
@if(!$request['fresh'])
    </div>
@endif
