
<div
    @if(isset($entrance) && $entrance->id != NULL)
        @php $class = 'entranceDialog' . $entrance->id @endphp
        id="entranceDialog{{$entrance->id}}" data-id="{{$entrance->id}}"
    @else
        @php $class = 'entranceDialog' @endphp
        id="entranceDialog"
    @endif
    class="dialog entrance_dialog" style="width:1100px;">
    @if(isset($entrance) && $entrance->id != NULL)
        <div class="titlebar">Поступление товара #{{ $entrance->id }} по заявке #{{ $entrance->providerorder()->first()->id }}</div>
    @else
        <div class="titlebar">Новое поступление товара</div>
    @endif
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>
        {{--<div class="modal-header dark" style="justify-content: normal;">--}}
            {{--<div class="b-r pr-3 mr-3">--}}
                {{--<span class="item-title _500">Поступление</span>--}}
                {{--<div class="item-except text-sm h-1x font-weight-bolder">--}}
                    {{--@if(isset($entrance) && $entrance->id != NULL)--}}
                        {{--№{{ $entrance->id }}--}}
                    {{--@else--}}
                        {{--Новое--}}
                    {{--@endif--}}
                {{--</div>--}}
                {{--<div class="item-tag tag hide">--}}
                {{--</div>--}}
            {{--</div>--}}
            {{--<div class="b-r pr-3 mr-3">--}}
                {{--<span class="item-title _500">Всего на сумму</span>--}}
                {{--<div class="item-except font-weight-bolder h-1x">--}}
                    {{--<span id="total_price">--}}
                        {{--@if(isset($entrance))@else 0.0 @endif--}}
                    {{--</span> р--}}
                {{--</div>--}}
                {{--<div class="item-tag tag hide">--}}
                {{--</div>--}}
            {{--</div>--}}

            {{--@if(isset($entrance))--}}
                {{--<div class="b-r pr-3 mr-3">--}}
                    {{--<span class="item-title _500">Оплачено</span>--}}
                    {{--<div class="item-except @if($entrance->warrants()->sum('summ') >= $entrance->totalPrice) text-success @endif font-weight-bolder h-1x">--}}
                    {{--<span id="payed_price">--}}
                        {{--{{ sprintf("%.2f", $entrance->warrants()->sum('summ')) }} р / {{ $entrance->totalPrice }} р--}}
                    {{--</span>--}}
                    {{--</div>--}}
                    {{--<div class="item-tag tag hide">--}}
                    {{--</div>--}}
                {{--</div>--}}
            {{--@endif--}}

            {{--@if(isset($entrance) && ($entrance->warrants()->sum('summ') < $entrance->totalPrice) )--}}
                {{--<div class="b-r pr-3 mr-3">--}}
                    {{--<button onclick="{{ $class }}.getPayment()" class="btn btn-fw success">Оплатить</button>--}}
                {{--</div>--}}
            {{--@endif--}}
        {{--</div>--}}
    <form class="WarrantStoredListner" action="{{ route('StoreEntrance') }}" method="POST">
        @csrf
        @if(isset($entrance) && $entrance->id != NULL)
            <input type="hidden" name="id" value="{{ $entrance->id }}">
            {{--<input type="hidden" name="itogo" value="{{ $entrance->totalPrice }}">--}}
            {{--<input type="hidden" name="ostatok" value="{{ $entrance->totalPrice - $entrance->warrants()->sum('summ') }}">--}}
        @else
            <input type="hidden" name="id" value="">
        @endif
        <input class="partner_select" type="hidden" name="partner_id" value=" @if(isset($entrance)){{ $entrance->providerorder()->first()->partner()->first()->id }}@endif">
        <input class="providerorder_select" type="hidden" name="providerorder_id" value=" @if(isset($entrance)){{ $entrance->providerorder()->first()->id }}@endif">

        <div class="no-gutters align-items-stretch">
        <div class="padding">
            <div class="row mb-3">
                <div class="col-sm-6">
                    <div class="row">
                        <div class="col-sm-12 form-group mb-0">
                            <div class="form-group row">
                                <label for="partner_id" class="col-sm-3 no-pr col-form-label">Заявка поставщику</label>
                                <div class="col-sm-9">
                                    <button onclick="{{ $class }}.openSelectProviderOrderModal()" type="button" name="providerorder_id" class="providerorder_select form-control text-left button_select">
                                        @if(isset($entrance) && $entrance->providerorder()->first() != null)
                                            {{ $entrance->providerorder()->first()->outputName() }}
                                        @else
                                            Не выбрано
                                        @endif
                                    </button>

                                </div>
                            </div>
                            <div class="form-group row mb-0">

                                <label class="col-sm-3 no-pr col-form-label">Коментарий к поступлению</label>
                                <div class="col-sm-9">
                                    <textarea style="resize: none;" class="form-control" name="comment" id="comment" cols="30" rows="5">@if(isset($entrance)){{ $entrance->comment }}@endif</textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 form-group mb-0">
                    @if(isset($entrance))
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <span class="nav-link d-flex flex-row text-muted">
                                <span class="flex">Дата поступления</span>
                                <span class="text-sm">
				                		{{ $entrance->normalizedData() }}
				                	</span>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span class="nav-link d-flex flex-row text-muted">
                                <span class="flex">Поставщик</span>
                                <span class="text-sm">
				                		{{ $entrance->providerorder()->first()->partner()->first()->outputName() }}
				                	</span>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span class="nav-link d-flex flex-row text-muted">
                                <span class="flex">Общая сумма</span>
                                <span class="text-sm">
				                		{{ $entrance->providerorder()->first()->getWarrantPositive() }} р.
				                	</span>
                            </span>
                        </li>
                        <li class="nav-item">
                            <span class="nav-link d-flex flex-row text-muted">
                                <span class="flex">Принимающий</span>
                                <span class="text-sm">
				                		{{ $entrance->partner()->first()->outputName() }}
				                	</span>
                            </span>
                        </li>
                    </ul>
                    @endif
                </div>
            </div>
            <div class="form-group">
                <div for="category_id" class=" mb-3"><b>Список приходных номенклатур</b>
                </div>
                <div data-simplebar style="max-height: 300px;">
                    <table class="table table-sm table-hover b-t mb-0 d-block" style="min-height: 300px">
                        <thead class="text-muted">
                        <tr>
                            <th width="30%">Наименование</th>
                            <th width="10%">Артикул</th>
                            <th width="10%">Пр-ль</th>
                            <th width="10%" style="min-width: 60px;">Кол-во</th>
                            <th width="10%" style="min-width: 20px; white-space: nowrap">Поступило / Ожидается</th>
                            <th width="10%" style="min-width: 100px;">Цена</th>
                            {{--<th width="10%" style="min-width: 100px;">Всего</th>--}}
                            <th width="10%"></th>
                        </tr>
                        </thead>
                        <tbody class="product_list">
                        @if(isset($entrance))
                            @php $providerorder = $entrance->providerorder()->first(); @endphp
                            @foreach($entrance->articles()->get() as $product)
                                @include('entrance.dialog.product_element')
                            @endforeach
                        @endif
                        </tbody>
                    </table>
                </div>
                {{--<div class="input-group">--}}
                    {{--<button name="products" type="button" onclick="{{ $class }}.openProductmodal()" class="btn btn-fw white"><i class="fa fa-plus"></i> Добавить товар</button>--}}
                {{--</div>--}}
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
