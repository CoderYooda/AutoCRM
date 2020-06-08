@foreach($stores as $store)
    @include(env('DEFAULT_THEME', 'classic') . '.settings.elements.store_elem')
@endforeach
@can('Редактировать настройки')
{{--<div class="col-sm-3 mt-30">--}}
    {{--<div class="box gray-box p-15">--}}
        {{--<i class="fa fa-plus-square add-icon"></i>--}}
        {{--<div class="box-footer">--}}
            {{--<button onclick="openDialog('storeDialog')" class="button mb-0 w-100">Новый магазин</button>--}}
        {{--</div>--}}
    {{--</div>--}}
{{--</div>--}}
@endcan
