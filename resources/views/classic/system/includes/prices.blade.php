<form action="{{ route('ChangeMarkupSourceProducts') }}" method="POST" class="p-10" onsubmit="store.changeProductsMarkupSource(this);">

    <div class="modal-header">
        <h2>Изменение источника наценки стоимости товара</h2>
    </div>

    <div class="modal-body p-10">
        <select custom_select name="markup_source">
            @foreach($prices as $price)
                <option value="{{ $price->id }}">{{ $price->name }}</option>
            @endforeach
        </select>
    </div>

    <div class="modal-footer">
        <button type="button" onclick="store.modal.hide();" class="button">Закрыть</button>
        <button type="button" class="button primary pull-right" onclick="store.changeProductsMarkupSource(this);">Изменить</button>
    </div>

</form>
