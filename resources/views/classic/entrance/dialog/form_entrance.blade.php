@if(!isset($inner) || !$inner)
<div
    @if(isset($entrance) && $entrance->id != NULL)
        @php $class = 'entranceDialog' . $entrance->id @endphp
        id="entranceDialog{{$entrance->id}}" data-id="{{$entrance->id}}"
    @else
        @php $class = 'entranceDialog' @endphp
        id="entranceDialog"
    @endif
    class="dialog entrance_dialog" style="width:800px;">
@endif
    @if(isset($entrance) && $entrance->id != NULL)
        <div class="titlebar">Поступление товара #{{ $entrance->id }} по заявке #{{ $entrance->providerorder()->first()->id }}</div>
    @else
        <div class="titlebar">Новое поступление товара</div>
    @endif
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>
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
        <div class="box-body">
            <div class="row row-sm mb-15">
                <div class="col-sm-6">

                    <div class="form-group row row-sm">
                        <label for="category_id" class="col-sm-5 label-sm">Заявка поставщику</label>
                        <div class="input-group mb-3 col-sm-7 mb-0">
                            <button onclick="{{ $class }}.openSelectProviderOrderModal()" type="button" name="providerorder_id" class="providerorder_select form-control text-left button_select" @if(isset($entrance) && $entrance->providerorder()->first() != null) disabled @endif>
                                @if(isset($entrance) && $entrance->providerorder()->first() != null)
                                    {{ $entrance->providerorder()->first()->outputName() }}
                                @else
                                    <option>Не выбрано</option>
                                @endif
                            </button>
                        </div>
                    </div>
                    <div class="form-group row row-sm mb-0">
                        <div class="col-sm-12">
                            @if(!isset($entrance))
                                <textarea style="resize: none; height: 128px;" class="form-control" name="comment" id="entrance_dialog_focused" cols="30" rows="5"></textarea>
                            @else
                                <label>Комментарий:</label>
                                {{ $entrance->comment ?? 'Не указан' }}
                            @endif
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 form-group mb-0" id="entrance_info_block">
                    @if(isset($entrance))
                        @php $providerorder = $entrance->providerorder()->first(); @endphp
                        @include(get_template() . '.provider_orders.contact-card')
                    @endif
                </div>
            </div>
            <div class="form-group">
                <div for="category_id" class=" mb-3"><b>Список приходных номенклатур</b>
                </div>
                <div data-simplebar style="max-height: 300px;">
                    <table class="table-modal" style="max-height: 300px;">
                        <thead class="text-muted">
                        <tr>
                            <th width="30%">Наименование</th>
                            <th width="10%">Артикул</th>
                            <th width="10%" style="min-width: 60px;">Кол-во</th>
                            <th width="17%" style="min-width: 20px; white-space: nowrap">Поступило / Ожидается</th>
                            <th width="8%" style="min-width: 100px;">Цена</th>
                            {{--<th width="10%" style="min-width: 100px;">Всего</th>--}}
                            <th width="5%"></th>
                        </tr>
                        </thead>
                        <tbody class="product_list">
                        @if(isset($entrance))
                            @foreach($entrance->articles()->get() as $product)
                                @include(get_template() . '.entrance.dialog.product_element')
                            @endforeach
                        @endif
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            @if(!isset($entrance))
                <button type="button" class="button primary pull-right uppercase-btn" onclick="{{ $class }}.saveAndClose(this)">Сохранить и закрыть</button>
                <button type="button" class="button primary pull-right mr-15 uppercase-btn" onclick="{{ $class }}.save(this)">Сохранить</button>
            @endif
            <button class="button white mr-15 uppercase-btn" onclick="{{ $class }}.finitaLaComedia(this)">Закрыть</button>
        </div>
        <div class="system_message">

        </div>
    </form>
@if(!isset($inner) || !$inner)
</div>
@endif
