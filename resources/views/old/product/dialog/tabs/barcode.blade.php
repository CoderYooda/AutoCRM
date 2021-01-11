<div class="tab-pane p-3" id="{{$class}}_tab_barcode">
    <div class="form-group">
        <label>Штрих код (EAN 13)</label>
        <input type="text" name="barcode" class="form-control" value="@if(isset($product)){{ $product->barcode }}@endif" placeholder="Штрих код">
    </div>
    @if(isset($product) && $product->barcode != null)
        <div class="form-group">
            <img style="max-width: 100%" src="data:image/png;base64,{!! \App\Http\Controllers\BarcodeController::getBarCodePNG($product->barcode) !!}" alt="barcode"   />
        </div>
    @endif
    <div class="form-group">
        <label>Штрих код склада (EAN 13)</label>
        <input type="text" name="barcode_local" class="form-control" value="@if(isset($product)){{ $product->barcode_local }}@endif" placeholder="Штрих код склада">
    </div>
    @if(isset($product) && $product->barcode_local != null)
        <div class="form-group">
            <img style="max-width: 100%" src="data:image/png;base64,{!! \App\Http\Controllers\BarcodeController::getBarCodePNG($product->barcode_local) !!}" alt="barcode"   />
        </div>
    @endif
    <div class="form-group">
        <label>Внутренний номер склада (EAN 13)</label>
        <input type="text" name="storeCode" class="form-control" value="@if(isset($product)){{ $product->storeCode }}@endif" placeholder="Внутренний номер склада">
    </div>
    @if(isset($product) && $product->storeCode != null)
        <div class="form-group">
            <img style="max-width: 100%" src="data:image/png;base64,{!! \App\Http\Controllers\BarcodeController::getBarCodePNG($product->storeCode) !!}" alt="barcode"   />
        </div>
    @endif
</div>
{{--<input type="text" name="store[{{$store->id}}][location]"--}}
{{--       @if(isset($product) && $store->products->where('id', $product->id)->first() != NULL)--}}
{{--       value="{{ $store->products->where('id', $product->id)->first()->pivot->location }}"--}}
{{--       @endif--}}
{{--       class="form-control" placeholder="Наименование (не более 255 символов)">--}}
