<div id="store_{{ $store->id }}" class="col-sm-12 col-md-6">
    <div class="box">
        <div class="box-header">
            <h3>{{ $store->name }}</h3>
        </div>
        <div class="box-footer">
            <button class="btn success" onclick="openDialog('editStore', '&id={{ $store->id }}')">Редактировать</button>
            <button class="btn success" onclick="entity.remove('store', {{ $store->id }})">Удалить</button>
        </div>
    </div>
</div>
