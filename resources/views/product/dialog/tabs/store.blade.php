<div class="tab-pane animate fadeIn text-muted" id="tab_store">
    <div class="box">
{{--        <div class="box-header">--}}
{{--            <h3>Наличие на складах</h3>--}}
{{--        </div>--}}
        <table class="table">
            <thead>
            <tr>
                <th>Склад</th>
                <th>Количество</th>
            </tr>
            </thead>
            <tbody>
            @foreach($stores as $store)
                <tr>
                    <td>
                        {{ $store->name }}
                    </td>
                    <td>
                        @if(isset($product  )){{ $store->getArticlesCountById($product->id) }}@else 0 @endif
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
</div>
{{--<input type="text" name="store[{{$store->id}}][location]"--}}
{{--       @if(isset($product) && $store->articles->where('id', $product->id)->first() != NULL)--}}
{{--       value="{{ $store->articles->where('id', $product->id)->first()->pivot->location }}"--}}
{{--       @endif--}}
{{--       class="form-control" placeholder="Наименование (не более 255 символов)">--}}
