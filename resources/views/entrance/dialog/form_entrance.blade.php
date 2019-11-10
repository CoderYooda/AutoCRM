<div
    @if(isset($entrance) && $entrance->id != NULL)
        @php $class = 'entranceDialog' . $entrance->id @endphp
        id="entranceDialog{{$entrance->id}}" data-id="{{$entrance->id}}"
    @else
        @php $class = 'entranceDialog' @endphp
        id="entranceDialog"
    @endif
    class="dialog entrance_dialog" style="width:880px;">
    @if(isset($entrance) && $entrance->id != NULL)
        <div class="titlebar">Поступление товара №{{ $entrance->id }}</div>
    @else
        <div class="titlebar">Новое поступление товара</div>
    @endif
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>
        <div class="modal-header dark" style="justify-content: normal;">
            <div class="b-r pr-3 mr-3">
                <span class="item-title _500">Поступление</span>
                <div class="item-except text-sm h-1x font-weight-bolder">
                    @if(isset($entrance) && $entrance->id != NULL)
                        №{{ $entrance->id }}
                    @else
                        Новое
                    @endif
                </div>
                <div class="item-tag tag hide">
                </div>
            </div>
            <div class="b-r pr-3 mr-3">
                <span class="item-title _500">Всего на сумму</span>
                <div class="item-except font-weight-bolder h-1x">
                    <span id="total_price">
                        @if(isset($entrance)){{ $entrance->totalPrice }} @else 0.0 @endif
                    </span> р
                </div>
                <div class="item-tag tag hide">
                </div>
            </div>
            @if(isset($entrance) && ($entrance->warrants()->sum('summ') < $entrance->totalPrice) )
                <div class="b-r pr-3 mr-3">
                    <button onclick="{{ $class }}.getPayment()" class="btn btn-fw success">Оплатить</button>
                </div>
            @endif
            {{--@if(isset($entrance))--}}
                {{--<div class="b-r pr-3 mr-3">--}}
                    {{--<div class="checkbox" style="line-height: 40px;" >--}}
                        {{--<label class="ui-check mb-0">--}}
                            {{--<input disabled name="locked" type="checkbox" value="1" @if($entrance->locked) checked @endif>--}}
                            {{--<i class="dark-white"></i>--}}
                            {{--Замок--}}
                        {{--</label>--}}
                    {{--</div>--}}
                {{--</div>--}}
                {{--<div class="b-r pr-3 mr-3">--}}
                    {{--<button class="btn btn-fw success">Оплатить</button>--}}
                {{--</div>--}}
            {{--@endif--}}
        </div>
    <form class="WarrantStoredListner" action="{{ route('StoreEntrance') }}" method="POST">
        @csrf
        @if(isset($entrance) && $entrance->id != NULL)
            <input type="hidden" name="id" value="{{ $entrance->id }}">
            <input type="hidden" name="itogo" value="{{ $entrance->totalPrice }}">
            <input type="hidden" name="ostatok" value="{{ $entrance->totalPrice - $entrance->warrants()->sum('summ') }}">
        @else
            <input type="hidden" name="id" value="">
        @endif
        <input class="partner_select" type="hidden" name="partner_id" value=" @if(isset($entrance)){{ $entrance->partner()->first()->id }}@endif">

        <div class="no-gutters align-items-stretch">
        <div class="padding">
            <div class="row row-sm">
                <div class="col-sm-6">
                    <div class="row row-sm">
                        <div class="col-sm-12 form-group">
                            <label for="category_id">Поставщик</label>
                            <div class="input-group">
                                <select name="partner_id" disabled class="partner_select form-control input-c noarrow fake-disabled" readonly>
                                    @if(isset($entrance) && $entrance->partner()->first() != null)
                                        <option value="{{ $entrance->partner()->first()->id }}">{{ $entrance->partner()->first()->outputName() }}</option>
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
                            <label>Склад</label>
                            <select name="store_id" class="form-control input-c">
                                @foreach($stores as $store)
                                    <option value="{{ $store->id }}" @if(isset($entrance) && $entrance->store_id == $store->id) selected @elseif(Auth::user()->partner()->first()->store_id == $store->id) selected @endif>{{ $store->name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 form-group">
                    <label for="comment">Комментарий</label>
                    <textarea style="resize: none;" class="form-control" name="comment" id="comment" cols="30" rows="5">@if(isset($entrance)){{ $entrance->comment }}@endif</textarea>
                </div>
            </div>
            <div class="form-group">
                <div for="category_id" class=" mb-3"><b>Список приходных номенклатур</b>
                    <div class="pull-right checkbox">
                        <b class="pr-2">НДС:</b>
                        <label class="ui-check mb-0 pr-2">
                            <input name="nds" type="checkbox" value="1"
                                   @if(isset($entrance) && $entrance->nds) checked
                                   @elseif(isset($entrance) && !$entrance->nds)
                                   @else checked @endif
                                   onclick="{{ $class }}.setNDS();">
                            <i class="dark-white"></i>
                            - есть
                        </label>
                        <label class="ui-check mb-0">
                            <input name="nds_included" type="checkbox" value="1"
                                   @if(isset($entrance) && $entrance->nds_included) checked
                                   @elseif(isset($entrance) && !$entrance->nds_included)
                                   @else checked @endif
                                   onclick="{{ $class }}.setNDS();">
                            <i class="dark-white"></i>
                            - включена в стоимость
                        </label>
                    </div>
                </div>
                <div data-simplebar style="max-height: 300px;">
                    <table class="table table-sm table-hover b-t mh40-dialog d-block">
                        <thead class="text-muted">
                        <tr>
                            <th width="30%">Наименование</th>
                            <th width="10%">Артикул</th>
                            <th width="10%" style="min-width: 60px;">Кол-во</th>
                            <th width="10%" style="min-width: 100px;">Цена</th>
                            <th width="10%" style="min-width: 70px;">НДС, %</th>
                            <th width="10%" style="min-width: 100px;">НДС</th>
                            <th width="10%" style="min-width: 100px;">Всего</th>
                            <th width="10%"></th>
                        </tr>
                        </thead>
                        <tbody class="product_list">
                        @if(isset($entrance))
                            @foreach($entrance->articles()->get() as $product)
                                @include('entrance.dialog.product_element')
                            @endforeach
                        @endif
                        </tbody>
                    </table>
                </div>
                <div class="input-group">
                    <button name="products" type="button" onclick="{{ $class }}.openProductmodal()" class="btn btn-fw white"><i class="fa fa-plus"></i> Добавить товар</button>
                </div>
            </div>
        </div>
        </div>
        <div class="modal-footer">
            <button class="btn white" onclick="{{ $class }}.finitaLaComedia(this)">Закрыть</button>
            <button type="button" class="btn success" onclick="{{ $class }}.save(this)">Сохранить</button>
            <button type="button" class="btn success" onclick="{{ $class }}.saveAndClose(this)">Сохранить и закрыть</button>
        </div>
        <div class="system_message">

        </div>
    </form>
</div>
