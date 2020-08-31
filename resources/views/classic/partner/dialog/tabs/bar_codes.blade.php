<div class="form-group fl ip ul">
    <label>Штрих код (EAN 13)</label>
    <input type="text" name="barcode" class="form-control mb-15" value="{{ $partner->barcode ?? '' }}" placeholder="Штрих код">
    @if(isset($partner) && $partner->barcode != null)
        <img class="w-100" src="data:image/png;base64,{!! getBarCodePNG($partner->barcode) !!}" alt="barcode" />
    @endif
</div>
