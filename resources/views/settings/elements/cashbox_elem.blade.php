<div id="cashbox_{{ $cashbox->id }}" class="col-sm-12 col-md-6">
    <div class="box">
        <div class="box-header">
            <div class="text-xs float-right">
                <i class="fa fa-fw fa-money"></i>
                <strong>Текущий баланс: {{ $cashbox->balance }}</strong>
            </div>
            <h3>{{ $cashbox->name }}</h3>
        </div>
        <div class="box-footer">
            <button class="btn success" onclick="openDialog('editCashbox', '&id={{ $cashbox->id }}')">Редактировать</button>
            <button class="btn success" onclick="entity.remove('cashbox', {{ $cashbox->id }})">Удалить</button>
        </div>
    </div>
</div>
