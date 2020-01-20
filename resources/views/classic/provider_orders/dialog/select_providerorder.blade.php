@php $class = 'selectProviderOrderDialog' @endphp
<div id="selectProviderOrderDialog" class="dialog white" style="width:600px;">
    <div class="titlebar">Поиск заявки поставщику</div>
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>
    <div class="navbar white no-radius box-shadow pos-rlt">
        <form class="flex">
            @if($request['refer'])
            <input id="refer" type="hidden" name="refer" value="{{ $request['refer'] }}">
            @endif
        </form>
    </div>
    <div id="search_providerorder_results">
        @include(env('DEFAULT_THEME', 'classic') . '.provider_orders.dialog.select_providerorder_inner')
    </div>
    <div class="modal-footer">
        <button onclick="openDialog('providerorderDialog')" class="button primary pull-right mr-15 uppercase-btn" type="button">Новая заявка</button>
        <button type="button" class="button primary pull-right mr-15 uppercase-btn" onclick="{{ $class }}.addProductsToList(this)">Добавить</button>
        <button class="button white pull-right mr-15 uppercase-btn" onclick="closeDialog(event)">Закрыть</button>
    </div>
</div>
