<div class="tab-pane animate fadeIn text-muted" id="tab_store">
    @foreach($stores as $store)
    <div class="form-group">
        <div class="box-header mb-2" style="padding: 0px">
            <label class="float-right ui-switch primary">
                <input type="checkbox"
                       name="store[{{$store->id}}][isset]"
                       value="1"
                       @if(isset($product) && $store->articles->where('id', $product->id)->first() != NULL && $store->articles->where('id', $product->id)->first()->pivot->isset)
                       checked
                       @endif
                >
                <i></i>
            </label>
            <h3>{{ $store->name }}</h3>
        </div>
        <label>Местоположение</label>
        <input type="text" name="store[{{$store->id}}][location]"
               @if(isset($product) && $store->articles->where('id', $product->id)->first() != NULL)
               value="{{ $store->articles->where('id', $product->id)->first()->pivot->location }}"
               @endif
               class="form-control" placeholder="Наименование (не более 255 символов)">
    </div>
    @endforeach
</div>
