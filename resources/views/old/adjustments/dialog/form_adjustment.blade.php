@if(!isset($inner) || !$inner)
<div
    @if(isset($adjustment) && $adjustment->id != NULL)
    @php $class = 'adjustmentDialog' . $adjustment->id @endphp
    id="adjustmentDialog{{$adjustment->id}}" data-id="{{$adjustment->id}}"
    @else
    @php $class = 'adjustmentDialog' @endphp
    id="adjustmentDialog"
    @endif
    class="dialog adjustment_dialog" style="width:880px;">
@endif
    @if(isset($adjustment) && $adjustment->id != NULL)
        <div class="titlebar">Корректировка №{{ $adjustment->id }} от {{ $adjustment->normalizedData() }}</div>
    @else
        <div class="titlebar">Новая корректировка</div>
    @endif
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>
    {{--<div class="modal-header white" style="justify-content: normal;">--}}
    {{--</div>--}}
    <form @if(!isset($adjustment)) class="adjustmentStoredListner" action="{{ route('StoreAdjustment') }}" method="POST" @endif>
        @csrf
        @if(isset($adjustment) && $adjustment->id != NULL)
            <input type="hidden" name="id" value="{{ $adjustment->id }}">
        @else
            <input type="hidden" name="id" value="">
        @endif

        <input class="store_select" type="hidden" name="store_id" value=" @if(isset($adjustment)){{ $adjustment->store_id }}@endif">

        <div class="no-gutters align-items-stretch">
            <div class="padding">
                <div class="row row-sm">
                    <div class="col-sm-6">
                        <div class="row row-sm">
                            <div class="col-sm-12">
                                <div class="form-group row">
                                    <label for="partner_id" class="col-sm-3 col-form-label">Склад</label>
                                    <div class="col-sm-9">
                                        <select onchange="{{ $class }}.store_id = parseInt(this.value);{{ $class }}.checkInStock()" name="store_id" class="form-control input-c" @if(isset($adjustment)) disabled @endif>
                                            @foreach($stores as $store)
                                                <option value="{{ $store->id }}" @if(isset($adjustment) && $adjustment->store_id == $store->id) selected @elseif(Auth::user()->partner()->first()->store_id == $store->id) selected @endif>{{ $store->name }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-3 no-pr col-form-label" for="discount">Корректировщик</label>
                                    <div class="col-sm-9 input-group">
                                        <input type="text" class="form-control" disabled value="{{ Auth::user()->partner()->first()->outputName() }}">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 form-group">
                        <textarea placeholder="Комментарий" style="resize: none;height: 85px;" class="form-control" name="comment" id="providerorder_dialog_focused" cols="30" rows="3">@if(isset($adjustment)){{ $adjustment->comment }}@endif</textarea>
                    </div>
                </div>
                <div class="form-group mb-0">
                    <div for="category_id" class=" mb-3">
                        <b>Список приходных номенклатур</b>
                    </div>

                    <table class="table table-sm table-hover b-t mh40-dialog d-block mb-0" data-simplebar style="min-height: 300px">
                        <thead class="text-muted">
                        <tr>
                            <th width="20%">Наименование</th>
                            <th width="10%">Артикул</th>
                            <th width="10%" style="min-width: 100px;">Производитель</th>
                            <th width="10%" style="min-width: 60px;">По&nbspучету</th>
                            <th width="10%" style="min-width: 60px;">Факт</th>
                            {{--<th width="10%" style="min-width: 100px;">Цена&nbspдо</th>--}}
                            {{--<th width="10%" style="min-width: 100px;">Цена&nbspфакт</th>--}}
                            <th width="10%"></th>
                        </tr>
                        </thead>
                        <tbody class="product_list">
                        @if(isset($adjustment))
                            @foreach($adjustment->articles()->get() as $product)
                                @include('old.adjustments.dialog.product_element')
                            @endforeach
                        @endif
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="input-group">
                @if(!isset($adjustment))
                    <button name="products" type="button" onclick="{{ $class }}.openProductmodal()" class="btn btn-fw white"><i class="fa fa-plus"></i> Добавить товары</button>
                @endif
            </div>
            <button type="button" class="btn white" onclick="{{ $class }}.finitaLaComedia(this)">Закрыть</button>
            @if(!isset($adjustment))
            <button type="button" class="btn success" onclick="{{ $class }}.save(this)">Сохранить</button>
            <button type="button" class="btn success" onclick="{{ $class }}.saveAndClose(this)">Сохранить&nbspи&nbspзакрыть</button>
            @endif
        </div>
        <div class="system_message">

        </div>
    </form>
@if(!isset($inner) || !$inner)
</div>
@endif
