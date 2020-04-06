<div id="store_{{ $store->id }}" class="col-sm-3 mt-30">
    <div class="box gray-box p-15">
        <h3 class="box-header-h mb-10">{{ $store->name }}</h3>
        <div class="">Товаров в наличии: <br><b>*</b></div>
        <div class="box-footer">
            @can('Редактировать настройки')
            <button class="button primary mt-10" onclick="openDialog('storeDialog', '&store_id={{ $store->id }}')">Редактировать</button>
            <button class="button primary mt-10" onclick="entity.remove('store', {{ $store->id }})">Удалить</button>
            @endcan
        </div>
    </div>
</div>
