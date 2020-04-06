<div id="cashbox_{{ $cashbox->id }}" class="col-sm-3 mt-30 no-pr">
    <div class="box gray-box p-15">
        <h3 class="box-header-h mb-10">{{ $cashbox->name }}</h3>
        {{--<div class="box-header">--}}

            {{--<div class="text-xs float-right">--}}
                {{--<i class="fa fa-fw fa-money"></i>--}}
                {{--<strong>Текущий баланс: {{ $cashbox->balance }}</strong>--}}
            {{--</div>--}}

        {{--</div>--}}
        <div class="">Текущий баланс: <br><b>{{ $cashbox->balance }} руб.</b></div>
        <div class="box-footer">
            @can('Редактировать настройки')
                <button class="button primary mt-10" onclick="openDialog('cashboxDialog', '&cashbox_id={{ $cashbox->id }}')">Редактировать</button>
                <button class="button primary mt-10" onclick="entity.remove('cashbox', {{ $cashbox->id }})">Удалить</button>
            @endcan
        </div>
    </div>
</div>
