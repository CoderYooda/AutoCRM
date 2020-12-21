<div id="ddsarticle_{{ $Ddsarticle->id }}" class="col-sm-12 col-md-6">
    <div class="box">
        <div class="box-header">
            <h3>{{ $Ddsarticle->name }}</h3>
        </div>
        <div class="box-footer">
            <button class="btn success" onclick="openDialog('editDdsarticle', '&id={{ $Ddsarticle->id }}')">Редактировать</button>
            <button class="btn success" onclick="entity.remove('ddsarticle', {{ $Ddsarticle->id }})">Удалить</button>
        </div>
    </div>
</div>
