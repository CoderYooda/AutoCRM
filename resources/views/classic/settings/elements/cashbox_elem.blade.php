<div id="cashbox_{{ $cashbox->id }}" class="col-sm-3 mt-30 no-pr @if($cashbox->trashed()) trashed @endif">
    <div class="box gray-box p-15">
        <h3 class="box-header-h mb-10">{{ $cashbox->name }} @if($cashbox->trashed()) ( Удалена ) @endif</h3>
        <span>Uuid: {{ $cashbox->cashbox_uuid }}</span>
        <div class="">Текущий баланс: <br><b>{{ correct_price($cashbox->balance) }} руб.</b></div>
        <div class="box-footer">
            @can('Редактировать настройки')

                @if(!$cashbox->trashed())
                    <button class="button primary mt-10" onclick="openDialog('cashboxDialog', '&cashbox_id={{ $cashbox->id }}')">Редактировать</button>
                    <button class="button primary mt-10" onclick="entity.remove('cashbox', {{ $cashbox->id }})">Удалить</button>
                @else
                    <button class="button primary mt-10 w-100" onclick="entity.restore('cashbox', {{ $cashbox->id }})">Восстановить</button>
                @endif
            @endcan
        </div>
    </div>
</div>
