<div class="tab-pane p-3" id="{{$class}}_tab_barcode">

    <div class="form-group">
        <label>Штрих-код производителя (EAN 13)</label>
        <input type="text" name="barcode" class="form-control" value="{{ $product->barcode ?? '' }}" placeholder="Штрих код">
    </div>
    @if(isset($product) && $product->barcode != null)
        <div class="form-group">
            <img style="max-width: 100%" src="data:image/png;base64,{!! getBarCodePNG($product->barcode) !!}" alt="barcode"   />
        </div>
    @endif

    <div class="form-group">
        <label>Внутренний штрих-код (EAN 13)</label>
        <input type="text" id="barcode_local" name="barcode_local" class="form-control" value="{{ $product->barcode_local ?? '' }}" placeholder="Штрих код склада">
    </div>
    @if(isset($product) && $product->barcode_local != null)
        <div class="form-group">
            <img style="max-width: 100%" src="data:image/png;base64,{!! getBarCodePNG($product->barcode_local) !!}" alt="barcode"   />
        </div>
    @endif

</div>
