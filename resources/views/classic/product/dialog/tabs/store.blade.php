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
                       <input name="storage[{{ $store->id }}][storage_zone]" value=" @if(isset($product)){{          $store->getArticleStorageZone($product->id) }}@endif" onclick="this.select()" maxlength="2" class="storage_store bb_1" type="text">
                       <input name="storage[{{ $store->id }}][storage_rack]" value=" @if(isset($product)){{          $store->getArticleStorageRack($product->id) }}@endif" onclick="this.select()" maxlength="2" class="storage_store bb_2" type="text">
                       <input name="storage[{{ $store->id }}][storage_vertical]" value=" @if(isset($product)){{      $store->getArticleStorageVert($product->id) }}@endif" onclick="this.select()" maxlength="2" class="storage_store bb_3" type="text">
                       <input name="storage[{{ $store->id }}][storage_horizontal]" value=" @if(isset($product)){{    $store->getArticleStorageHor($product->id)  }}@endif" onclick="this.select()" maxlength="2" class="storage_store bb_4" type="text">
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
</div>
