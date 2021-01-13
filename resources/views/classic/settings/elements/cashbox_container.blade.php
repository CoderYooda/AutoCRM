
@foreach($cashboxes as $cashbox)
    @include(get_template() . '.settings.elements.cashbox_elem')
@endforeach
@can('Редактировать настройки')
<div class="col-sm-3 mt-30">
    <div class="box gray-box p-15">
        <i class="fa fa-plus-square add-icon"></i>
        <div class="box-footer">
            <button onclick="openDialog('cashboxDialog')" class="button mb-0 w-100">Новая касса</button>
        </div>
    </div>
</div>
@endcan
