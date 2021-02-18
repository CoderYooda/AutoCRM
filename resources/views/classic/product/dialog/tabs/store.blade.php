<div class="tab-pane" id="{{$class}}_tab_store">
    <table class="table w-100">
        <thead>
        <tr>
            <th>Склад</th>
            <th>Количество</th>
            <th>Хранение</th>
        </tr>
        </thead>
        <tbody>
        {{--{{ dd($stores) }}--}}
        @foreach($stores as $store)
            <tr>
                <td>
                    {{ $store->name }}
                </td>
                <td>
                    @isset($product) {{ $product->getCountInStoreId($store->id) ?? 0 }} @endisset
                </td>
                <td>
                   <div class="storage_store_container">
                       <input name="storage[{{ $store->id }}][storage_zone]" value=" @if(isset($product)){{          $product->getStorageZone($store->id) }}@endif" onclick="this.select()" maxlength="2" class="storage_store bb_1" type="text">
                       <input name="storage[{{ $store->id }}][storage_rack]" value=" @if(isset($product)){{          $product->getStorageRack($store->id) }}@endif" onclick="this.select()" maxlength="2" class="storage_store bb_2" type="text">
                       <input name="storage[{{ $store->id }}][storage_vertical]" value=" @if(isset($product)){{      $product->getStorageVert($store->id) }}@endif" onclick="this.select()" maxlength="2" class="storage_store bb_3" type="text">
                       <input name="storage[{{ $store->id }}][storage_horizontal]" value=" @if(isset($product)){{    $product->getStorageHor($store->id)  }}@endif" onclick="this.select()" maxlength="2" class="storage_store bb_4" type="text">
                   </div>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
    <div class="box mt-10">
        <div class="bb_faq faq_1">Зона хранения</div>
        <div class="bb_faq faq_2">Номер стеллажа</div>
        <div class="bb_faq faq_3">Номер вертикальной секции стеллажа</div>
        <div class="bb_faq faq_4">Номер полки</div>
    </div>
    <div class="form-group">
        <label>Минимальный остаток на складе <i id="trin_preload" class="fa fa-spinner fa-spin hide"></i></label>
        <input  type="text" name="min_stock" id="product_dialog_focused"
                @if(isset($product))value="{{ $product->getMinStock() }}"
                @elseif (isset($request) && $request['min_stock'] != NULL)value="{{ $request['min_stock'] }}"
                @else value ="0"
                @endif
                class="form-control" placeholder="Кол-во шт.">
    </div>

</div>
