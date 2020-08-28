@if(!$request->inner)
    <div id="entranceRefundDialog{{ $entrance_refund->id ?? '' }}" @if($entrance_refund) data-id="{{ $entrance_refund->id }}" @endif class="dialog" style="width:880px">
@endif

    <div class="titlebar">{{ $entrance_refund ? ('Возврат поступления №' . $entrance_refund->id) : 'Новый возврат поступления' }}</div>

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
                        {{ $entrance_refund->created_at }}
                    </span>
                </div>
                <div class="item-tag tag hide">
                </div>
            </div>
            <div class="modal-alt-header">
                <span class="item-title _500">Итого</span>
                <div class="item-except font-weight-bolder h-1x">
                    <span id="itogo_price">{{ decimal_price($entrance_refund->getTotalPrice()) }}</span> р
                </div>
                <div class="item-tag tag hide">
                </div>
            </div>

            @if($entrance_refund->wsumm < $entrance_refund->getTotalPrice())
                <div class="modal-alt-header">
                    <span class="item-title _500">Возвращено</span>
                    <div class="item-except  font-weight-bolder h-1x">
                        <span>{{ $entrance_refund->wsumm }} р / <span id="payed_price">{{ decimal_price($entrance_refund->getTotalPrice()) }}</span> р</span>
                    </div>
                    <div class="item-tag tag hide">
                    </div>
                </div>

                <div class="modal-alt-header">
                    <button onclick="{{ $class }}.getBackPayment()" class="button warning uppercase-btn">Вернуть средства</button>
                </div>
            @else
                {{--<div class="modal-alt-header mt-2">--}}
                    {{--<button type="button" class="button success uppercase-btn" style="cursor: unset;">Средства получены</button>--}}
                {{--</div>--}}
            @endif

        @endif

    </div>
    <form class="WarrantStoredListner" action="{{ route('StoreEntranceRefund') }}" method="POST">
        <div class="box-body">
            @csrf

            <input type="hidden" name="id" value="{{ $entrance_refund->id ?? '' }}">
            @if($entrance_refund)
                <input type="hidden" name="ostatok" value="{{ $entrance_refund->getTotalPrice() - $entrance_refund->wsumm }}">
                <input type="hidden" name="itogo" value="{{ $entrance_refund->getTotalPrice() }}">
            @endif

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
                            <button onclick="{{ $class }}.openSelectEntranceRefundModal()" type="button" name="entrance_id" class="shipment_select form-control text-left button_select" @if($entrance_refund) disabled @endif>
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
                            <input title="{{ $entrance_refund->partner->official_name ?? 'Не указан' }}" id="partner_butt" type="text" name="partner_id" value="{{ $entrance_refund->partner->official_name ?? 'Не указан' }}" class="form-control" disabled>
                        </div>
                        <div class="col-sm-3">
                            <span class="partner-balance">
                                Баланс:<br>
                                <span id="balance">{{ correct_price($entrance_refund->partner->balance ?? 0) }} р</span>
                            </span>
                        </div>
                    </div>
                    <div class="form-group row row-sm">
                        <label class="col-sm-5" for="discount">Ответственный</label>
                        <div class="col-sm-7 input-group">
                            <input type="text" title="{{ Auth::user()->partner->outputName() }}" value="{{ Auth::user()->partner->outputName() }}" class="form-control" disabled>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group row row-sm">
                        <div class="col-sm-12">
                            @if(!isset($entrance_refund))
                            <textarea placeholder="Комментарий" style="resize: none;height: 128px;" class="form-control" name="comment" cols="30" rows="5">{{ $entrance_refund->comment ?? '' }}</textarea>
                            @else
                                <label>Комментарий:</label>
                                {{ $entrance_refund->comment ?? 'Не указан' }}
                            @endif
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div for="category_id" class="mb-15"><b>Список доступных для возврата номенклатур</b>
                </div>
                <div data-simplebar style="max-height: 300px;">
                    <table class="table-modal" >
                        <thead class="text-muted">
                        <tr>
                            <th width="30%">Наименование</th>
                            <th width="10%">Артикул</th>
                            <th width="10%">Кол-во</th>
                            <th width="20%">Реализовано / Поступило</th>
                            <th width="10%">Цена</th>
                            <th width="10%">Всего</th>
                            <th width="5%"></th>
                        </tr>
                        </thead>
                        <tbody class="product_list">
                        @if(count($products))
                            @include(get_template() . '.entrance_refunds.dialog.products_element')
                        @endif
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

@if(!$request->inner)
    </div>
@endif
