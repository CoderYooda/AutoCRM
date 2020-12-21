<div class="tab-pane p-3" id="{{$class}}_tab_barcode">

    <div class="form-group">
        <label>Штрих-код производителя (EAN 13)</label>
        <input type="text" name="barcode" class="form-control" value="{{ $product->barcode ?? '' }}" placeholder="Штрих код">
    </div>

{{--    @dd($product->barcode, $product->barcode_local, strlen($product->barcode) == 13, strlen($product->barcode_local) == 13)--}}

    @if($product && strlen($product->barcode) == 13)
        <div class="form-group">
            <img style="max-width: 100%" src="data:image/png;base64,{!! getBarCodePNG($product->barcode) !!}" alt="barcode"   />
        </div>
    @endif

    <div class="form-group">
        <label>Внутренний штрих-код (EAN 13)</label>
        <input type="text" id="barcode_local" name="barcode_local" class="form-control" value="{{ $product->barcode_local ?? '' }}" placeholder="Штрих код склада">
    </div>

    @if($product && strlen($product->barcode_local) == 13)
        <div class="form-group">
            <img style="max-width: 100%" src="data:image/png;base64,{!! getBarCodePNG($product->barcode_local) !!}" alt="barcode"   />
        </div>
    @endif

</div>
