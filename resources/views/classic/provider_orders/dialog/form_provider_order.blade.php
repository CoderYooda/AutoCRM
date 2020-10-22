@php $stores = App\Models\Store::owned()->get(); @endphp

@if(!isset($inner) || !$inner)
    <div id="providerorderDialog{{$provider_order->id ?? ''}}" @if($provider_order) data-id="{{$provider_order->id}}" @endif class="dialog provider_order_dialog new_dialog" style="width:1000px;">
@endif
        <div class="titlebar">{{ isset($provider_order) ? ('Заявка поставщику №' . $provider_order->id) : ('Новая заявка поставщику') }}</div>
        <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
        <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>
        <div class="modal-header dark" style="justify-content: normal;">
            <div class="modal-alt-header">
                <span class="item-title _500">Всего на сумму</span>
                <div class="item-except font-weight-bolder h-1x">
                    <span id="total_price">{{ correct_price($provider_order->summ ?? 0.0) }}</span> ₽
                </div>
                <div class="item-tag tag hide">

                </div>
            </div>
            @if(isset($provider_order))
                <div class="modal-alt-header">
                    <span class="item-title _500">Оплачено</span>
                    <div class="item-except @if(-$provider_order->wsumm === $provider_order->itogo) text-success
                        @elseif(-$provider_order->wsumm > $provider_order->itogo) text-danger @endif font-weight-bolder h-1x">
                        <span id="payed_price">
                            {{ correct_price(-$provider_order->wsumm) }} / <span id="itogo_price">{{ correct_price($provider_order->itogo)  }}</span> ₽
                        </span>
                    </div>
                    <div class="item-tag tag hide">
                    </div>
                </div>
            @else
            @endif
            @if(isset($provider_order) && (-$provider_order->wsumm < $provider_order->itogo) )
                <div class="modal-alt-header">
                    <button onclick="{{ $class }}.getPayment()" class="button success uppercase-btn">Оплатить</button>
                </div>
            @endif
            @if(isset($provider_order) && (-$provider_order->wsumm > $provider_order->itogo) )
                <div class="b-r pr-3 mr-3">
                    <button onclick="{{ $class }}.getBackPayment()" class="button success uppercase-btn">Вернуть средства</button>
                </div>
            @endif
        </div>
        <form class="WarrantStoredListner ProviderOrderStoredListner" action="{{ route('StoreProviderOrder') }}" method="POST">

            <div class="modal-body">
                @csrf
                @if(isset($provider_order) && $provider_order->id != NULL)
                    <input type="hidden" name="id" value="{{ $provider_order->id }}">
                    <input type="hidden" name="summ" value="{{ $provider_order->summ }}">
                    <input type="hidden" name="itogo" value="{{ $provider_order->itogo }}">
                    <input type="hidden" name="ostatok" value="{{ $provider_order->itogo - -$provider_order->wsumm }}">
                @else
                    <input type="hidden" name="id" value="">
                @endif

                <input class="partner_select" type="hidden" name="partner_id" value=" @if(isset($provider_order)){{ $provider_order->partner()->first()->id }}@endif">
                <div class="d-flex">
                    <div class="link-tabs no-pr">
                        <ul class="nav" id="po_tabs">
                            <li class="nav-item active">
                                <a class="nav-link" href="#tab_base" aria-controls="tab_base" data-toggle="tab" data-target="#tab_base">
                                    Основные
                                    <span class="float-right helper_danger d-none-f">
                                    <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                                </span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#tab_items" aria-controls="tab_items" data-toggle="tab" data-target="#tab_items">
                                    Позиции
                                    <span class="float-right helper_danger d-none-f">
                                    <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                                </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-content no-pl">
                        <div class="tab-pane active" id="tab_base">
                            <div class="form-group row row-sm">
                                <label for="category_id" class="col-sm-4 label-sm">Поставщик</label>
                                <div class="input-group col-sm-8">
                                    <button onclick="{{ $class }}.openSelectPartnerModal()" type="button" name="partner_id" class="partner_select form-control text-left button_select">
                                        @if(isset($provider_order) && $provider_order->partner()->first() != null)
                                            {{ $provider_order->partner()->first()->outputName() }}
                                        @else
                                            <option>Не выбрано</option>
                                        @endif
                                    </button>
                                </div>
                            </div>
                            <div class="form-group row row-sm">
                                <label for="category_id" class="col-sm-4 label-sm">Склад</label>
                                <div class="input-group col-sm-8">
                                    <div class="w-100">
                                        <select custom_select name="store_id" class="form-control input-c">
                                            @foreach($stores as $store)
                                                <option value="{{ $store->id }}" @if(isset($provider_order) && $provider_order->store_id == $store->id) selected @elseif(Auth::user()->partner()->first()->store_id == $store->id) selected @endif>{{ $store->name }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row row-sm">
                                <div class="col-sm-12">
                                    <textarea placeholder="Комментарий" style="resize: none;height: 70px;" class="form-control" name="comment" cols="20" rows="6">@if(isset($provider_order)){{ $provider_order->comment }}@endif</textarea>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" id="tab_items">

                            <div data-items="@if($provider_order){{ json_encode($provider_order->articlesJson->toArray()) }}@else[]@endif" id="po_list">

                            </div>

                            <div class="form-group">
                                <div class="mb-15"><b>Список приходных номенклатур</b>
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
                                            - включен в стоимость
                                        </label>
                                    </div>
                                </div>
                                <div data-simplebar style="max-height: 150px;">

                                    <table class="table-modal" >
                                        <thead class="text-muted">
                                        <tr>
                                            <th width="30%">Наименование</th>
                                            <th width="10%">Артикул</th>
                                            <th width="10%" style="min-width: 60px;">Кол-во</th>
                                            <th width="10%" style="min-width: 100px;">Цена</th>
                                            <th width="10%" style="min-width: 70px;">НДС, %</th>
                                            <th width="10%" style="min-width: 100px;">НДС</th>
                                            <th width="10%" style="min-width: 100px;">Итого</th>
                                            <th width="10%"></th>
                                        </tr>
                                        </thead>
                                        <tbody class="product_list">
                                        @isset($provider_order->articles)
                                            @foreach($provider_order->articles as $product)
                                                @include(get_template() . '.provider_orders.dialog.product_element')
                                            @endforeach
                                        @endisset
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="table_header">
                            <div class="w-30 pl-10">Наименование</div>
                            <div class="w-15">Артикул</div>
                            <div class="w-10">Кол-во</div>
                            <div class="w-10">Цена</div>
                            <div class="w-10">НДС, %</div>
                            <div class="w-10">НДС</div>
                            <div class="w-10">Итого</div>
                            <div class="w-5"></div>
                        </div>

                        <div data-simplebar class="table-simplebar">
                            <div class="element-list">
                                @isset($provider_order->articles)
                                    @foreach($provider_order->articles as $product)
                                        @include(get_template() . '.provider_orders.dialog.product_element')
                                    @endforeach
                                @endisset
                            </div>
                        </div>

                        <button type="button" class="button add_product_button mb-15" onclick="{{ $class }}.openProductmodal();">Добавить товар</button>

                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button class="button white uppercase-btn" onclick="{{ $class }}.finitaLaComedia(this)">Закрыть</button>
                <button type="button" class="button primary pull-right uppercase-btn" onclick="{{ $class }}.saveAndClose(this)">Сохранить и закрыть</button>
                <button type="button" class="button primary pull-right mr-15 uppercase-btn" onclick="{{ $class }}.save(this)">Сохранить</button>
            </div>

            <div class="system_message">
            </div>

        </form>
        @if(!isset($inner) || !$inner)
    </div>
@endif
