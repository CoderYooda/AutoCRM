    @if(!$request['fresh'])
        <div
        @if(isset($refund) && $refund->id != NULL)
        @php $class = 'refundDialog' . $refund->id @endphp
        id="refundDialog{{$refund->id}}" data-id="{{$refund->id}}"
        @else
        @php $class = 'refundDialog' @endphp
        id="refundDialog"
        @endif
        class="dialog refund_dialog " style="width:600px">
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
        <div class="modal-alt-header">
            <span class="item-title _500">Всего на сумму</span>
            <div class="item-except font-weight-bolder h-1x">
                    <span id="total_price">
                        @if(isset($refund)){{ $refund->summ }} @else 0.00 @endif
                    </span> р
            </div>
            <div class="item-tag tag hide">
            </div>
        </div>
        @if(isset($refund))
        <div class="modal-alt-header">
            <span class="item-title _500">Дата оформления</span>
            <div class="item-except font-weight-bolder h-1x">
                    <span>
                            {{ $refund->data() }}
                    </span>
            </div>
            <div class="item-tag tag hide">
            </div>
        </div>
        @endif
        @if(isset($refund) && ($refund->getWarrantPositive() > $refund->itogo) )
            <div class="modal-alt-header">
                <button onclick="{{ $class }}.getBackPayment()" class="button success uppercase-btn">Вернуть средства</button>
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
            <input class="partner_select" type="hidden" name="partner_id" value=" @if(isset($refund)){{ $refund->partner()->first()->id }}@endif">


            <div class="form-group row row-sm">
                <label for="partner_id" class="col-sm-3 no-pr col-form-label">Возврат по сделке</label>
                <div class="col-sm-9">
                    <button onclick="{{ $class }}.openSelectTransactionModal()" type="button" name="transaction_id" class="transaction_select form-control text-left button_select">
                        @if(isset($refund) && $refund->transaction()->first() != null)
                            {{ $refund->transaction()->first()->outputName() }}
                        @else
                            Не выбрано
                        @endif
                    </button>
                </div>
            </div>

            <div class="form-group row row-sm">
                <label class="col-sm-3" for="discount">Скидка</label>
                <div class="col-sm-9 input-group">
                    <input onClick="this.select();" type="number" name="discount" class="form-control" placeholder="Скидка" @if($refund) value="{{ $refund->discount }}" @else value="0" @endif>
                    <span class="input-group-append">
                                <div class="dropdown" onclick="window.helper.openModal(this, event)">
                                    <div class="drop-butt"><span id="inpercents_text"> @if(isset($refund) && $refund->inpercents)в процентах@elseв рублях@endif</span> <i class="fa fa-chevron-down" aria-hidden="true"></i></div>
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
                {{--<input type="text" name="phone" class="form-control phone_input" placeholder="Телефон" @if($refund) value="{{ $refund->phone }}" @else value="0" @endif>--}}
                {{--</div>--}}
                <div class="col-sm-9 input-group">
                    <input id="client-phone" type="text" name="phone" class="form-control phone_input" placeholder="Телефон" @if($refund) value="{{ $refund->phone }}" @else value="0" @endif>
                    <span class="input-group-append">
                        <div class="dropdown" onclick="window.helper.openModal(this, event)">
                            <div class="drop-butt"><span>Номера контрагента</span> <i class="fa fa-chevron-down" aria-hidden="true"></i></div>
                            <div class="dropdown_container">
                                <div class="arrow"></div>
                                <div id="phones-list">
                                    @if(isset($refund))
                                        @forelse($refund->partner()->first()->phones()->get() as $phone)
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
                                                Выберите контрагента
                                            </div>
                                         </div>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </span>
                </div>
            </div>

            <div class="form-group row row-sm">
                <div class="col-sm-12">
                    <textarea placeholder="Комментарий" style="resize: none;" class="form-control" name="comment" id="comment" cols="30" rows="5">@if(isset($refund)){{ $refund->comment }}@endif</textarea>
                </div>
            </div>


            <div class="form-group">
                <div for="category_id" class="mb-15"><b>Список приходных номенклатур</b>
                </div>
                <div data-simplebar style="max-height: 300px;">
                    <table class="table-modal" >
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
                        @if(isset($refund))
                            @foreach($refund->articles as $product)
                                @include(env('DEFAULT_THEME', 'classic') . '.refunds.dialog.product_element')
                            @endforeach
                        @endif
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal-footer" style="white-space: nowrap">
            <button name="products" type="button" onclick="{{ $class }}.openProductmodal()" class="button primary uppercase-btn mr-15"><i class="fa fa-plus"></i> Товар из базы</button>
            <button name="products" type="button" onclick="{{ $class }}.addQuickProduct()" class="button primary uppercase-btn mr-15"><i class="fa fa-plus"></i> Быстрый товар</button>

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
