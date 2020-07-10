<div id="entranceRefundDialog{{ $entrance_refund->id ?? '' }}" @if($entrance_refund) data-id="{{ $entrance_refund->id }}" @endif class="dialog" style="width:880px">

    <div class="titlebar">{{ $entrance_refund ? ('Возврат поставщика №' . $entrance_refund->id) : 'Новый возврат поставщика' }}</div>

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
        @if(isset($entrance_refund))
        <div class="modal-alt-header">
            <span class="item-title _500">Дата оформления</span>
            <div class="item-except font-weight-bolder h-1x">
                    <span>
                        {{ $entrance_refund->normalizedData() }}
                    </span>
            </div>
            <div class="item-tag tag hide">
            </div>
        </div>
        <div class="modal-alt-header">
            <span class="item-title _500">Итого</span>
            <div class="item-except font-weight-bolder h-1x">
                <span id="itogo_price">{{ $entrance_refund->wsumm }}</span> р
            </div>
            <div class="item-tag tag hide">
            </div>
        </div>
        @endif

        @if($entrance_refund)
            <div class="modal-alt-header">
                <button onclick="{{ $class }}.getBackPayment()" class="button warning uppercase-btn">Вернуть средства</button>
            </div>
        @endif

    </div>
    <form class="RefundStoredListner WarrantStoredListner ShipmentStoredListner" action="{{ route('StoreEntranceRefund') }}" method="POST">
        <div class="box-body">
            @csrf

            <input type="hidden" name="id" value="{{ $entrance_refund->id ?? '' }}">

            <input class="entrance_select" type="hidden" name="entrance_id" value="{{ $entrance_refund->entrance_id ?? '' }}">
            <input class="partner_id" type="hidden" name="partner_id" value="{{ $entrance_refund->partner_id ?? '' }}">

            @if(isset($entrance_refund))
                <input type="hidden" name="wsumm" value="{{ abs($entrance_refund->wsumm) }}">
            @endif

            <input type="hidden" name="store_id" value="{{ Auth::user()->getStoreFirst()->id }}">
            <div class="row row-sm">
                <div class="col-sm-6">
                    <div class="form-group row row-sm">
                        <label for="partner_id" class="col-sm-5 no-pr col-form-label">Возврат по поступлению</label>
                        <div class="col-sm-7">
                            <button onclick="{{ $class }}.openSelectEntranceRefundModal()" type="button" name="entrance_id" class="shipment_select form-control text-left button_select">
                                @if($entrance_refund)
                                    Возврат по поступлению №{{ $entrance_refund->entrance_id }}
                                @else
                                    Не выбрано
                                @endif
                            </button>
                        </div>
                    </div>

                    <div class="form-group row row-sm">
                        <label class="col-sm-5" for="discount">Поставщик</label>
                        <div class="col-sm-4 input-group no-pr">
                            <input id="partner_butt" type="text" name="partner_id" value="{{ $entrance_refund->partner->official_name ?? 'не указан' }}" class="form-control" disabled="disabled">
                        </div>
                        <div class="col-sm-3">
                            <span class="partner-balance">
                                Баланс:<br>
                                <span id="balance">{{ $entrance_refund->partner->balance ?? '0.00' }} р</span>
                            </span>
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
                            <textarea placeholder="Комментарий" style="resize: none;height: 128px;" class="form-control" name="comment" id="refund_dialog_focused" cols="30" rows="5">{{ $entrance_refund->comment ?? '' }}</textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div for="category_id" class="mb-15"><b>Список возвращаемых номенклатур</b>
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
                        @isset($entrance_refund->articles)
                            @foreach($entrance_refund->articles as $product)
                                @include(get_template() . '.entrance_refund.dialog.product_element')
                            @endforeach
                        @endisset
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal-footer" style="white-space: nowrap">
            <button type="button" class="button white uppercase-btn" onclick="{{ $class }}.finitaLaComedia()">Закрыть</button>
            <button type="button" class="button primary pull-right uppercase-btn" onclick="{{ $class }}.saveAndClose(this)">Сохранить и закрыть</button>
            <button type="button" class="button primary pull-right uppercase-btn mr-15" onclick="{{ $class }}.save(this)">Сохранить</button>
        </div>
        <div class="system_message">

        </div>
    </form>
</div>
