@php $stores = App\models\Store::owned()->get(); @endphp
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
            <div class="titlebar">Корректировка №{{ $adjustment->id }}</div>
        @else
            <div class="titlebar">Новая корректировка</div>
        @endif
        <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
        <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>
        <form class="AdjustmentStoredListner" action="{{ route('StoreAdjustment') }}" method="POST">
            <div class="box-body">
                @csrf
                @if(isset($adjustment) && $adjustment->id != NULL)
                    <input type="hidden" name="id" value="{{ $adjustment->id }}">
                @else
                    <input type="hidden" name="id" value="">
                @endif

                <input class="store_select" type="hidden" name="store_id" value=" @if(isset($adjustment)){{ $adjustment->store_id }}@endif">

                {{--<input class="partner_select" type="hidden" name="partner_id" value=" @if(isset($adjustment)){{ $adjustment->partner()->first()->id }}@endif">--}}

                <div class="row row-sm">
                    <div class="col-sm-6">
                        <div class="form-group row row-sm">
                            <label for="store_id" class="col-sm-4 label-sm">Склад</label>
                            <div class="input-group col-sm-8">
                                <select onchange="{{ $class }}.store_id = parseInt(this.value);{{ $class }}.checkInStock()" name="store_id" class="form-control input-c" @if(isset($adjustment)) disabled @endif>
                                    @foreach($stores as $store)
                                        <option value="{{ $store->id }}" @if(isset($adjustment) && $adjustment->store_id == $store->id) selected @elseif(Auth::user()->partner()->first()->store_id == $store->id) selected @endif>{{ $store->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="form-group row row-sm">
                            <label class="col-sm-4 label-sm" >Корректировщик</label>
                            <div class="col-sm-8 input-group">
                                <input type="text" class="form-control" disabled value="{{ Auth::user()->partner()->first()->outputName() }}">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <textarea placeholder="Комментарий" style="resize: none;height: 80px;" class="form-control" name="comment" id="adjustment_dialog_focused" cols="20" rows="6">@if(isset($adjustment)){{ $adjustment->comment }}@endif</textarea>
                    </div>
                </div>
                <div class="form-group">
                    <div class="mb-15"><b>Список приходных номенклатур</b>
                    </div>
                    <div data-simplebar style="max-height: 300px;">
                        <table class="table-modal" >
                            <thead class="text-muted">
                            <tr>
                                <th width="30%">Наименование</th>
                                <th width="10%">Артикул</th>
                                <th width="10%" style="min-width: 100px;">Производитель</th>
                                <th width="10%" style="min-width: 60px;">По&nbspучету</th>
                                <th width="10%" style="min-width: 60px;">Факт</th>
                                <th width="10%"></th>
                            </tr>
                            </thead>
                            <tbody class="product_list">
                            @if(isset($adjustment))
                                @foreach($adjustment->articles()->get() as $product)
                                    @include(env('DEFAULT_THEME', 'classic') . '.adjustments.dialog.product_element')
                                @endforeach
                            @endif
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal-footer">

                @if(!isset($adjustment))
                    <button name="products" type="button" onclick="{{ $class }}.openProductmodal()" class="button primary mr-15 uppercase-btn"><i class="fa fa-plus"></i> Добавить товар</button>@endif<button class="button white mr-15 uppercase-btn" onclick="{{ $class }}.finitaLaComedia()">Закрыть</button>
                @if(!isset($adjustment))
                    <button type="button" class="button primary pull-right uppercase-btn" onclick="{{ $class }}.saveAndClose(this)">Сохранить и закрыть</button>
                    <button type="button" class="button primary pull-right mr-15 uppercase-btn" onclick="{{ $class }}.save(this)">Сохранить</button>
                @endif

            </div>
            <div class="system_message">
            </div>
        </form>
        @if(!isset($inner) || !$inner)
    </div>
@endif
