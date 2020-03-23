
@foreach($cashboxes as $cashbox)
    @include(env('DEFAULT_THEME', 'classic') . '.settings.elements.cashbox_elem')
@endforeach

<div class="col-sm-3 mt-30">
    <div class="box gray-box p-15">
        {{--<div class="box-header">--}}

        {{--<div class="text-xs float-right">--}}
        {{--<i class="fa fa-fw fa-money"></i>--}}
        {{--<strong>Текущий баланс: {{ $cashbox->balance }}</strong>--}}
        {{--</div>--}}

        {{--</div>--}}
        <i class="fa fa-plus-square add-icon"></i>
        <div class="box-footer">
            <button onclick="openDialog('cashboxDialog')" class="button mb-0 w-100">Новая касса</button>
        </div>
    </div>
</div>
