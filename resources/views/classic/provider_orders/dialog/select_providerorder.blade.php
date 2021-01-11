@php $class = 'selectProviderOrderDialog' @endphp
<div id="selectProviderOrderDialog" class="dialog" style="width:600px;">
    <div class="titlebar">Поиск заявки поставщику</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>
    <div class="navbar">
        <form class="flex">
            @if($request['refer'])
            <input id="refer" type="hidden" name="refer" value="{{ $request['refer'] }}">
            @endif
        </form>
    </div>
    <div class="modal-header">
        <form class="flex d-flex w-100 ProviderOrderStoredListner">
            <input id="selectproviderorder_search" type="text" class="form-control search" placeholder="Поиск заявок поставщику" required="">
        </form>
    </div>
    <div id="search_providerorder_results" class="mb-15">
        @include(get_template() . '.provider_orders.dialog.select_providerorder_inner')
    </div>
    <div class="modal-footer">
        <button onclick="openDialog('providerorderDialog')" class="button primary pull-right uppercase-btn" type="button">Новая заявка</button>
        {{--<button type="button" class="button primary pull-right mr-15 uppercase-btn" onclick="{{ $class }}.addProductsToList(this)">Добавить</button>--}}
        <button class="button white mr-15 uppercase-btn" onclick="closeDialog(event)">Закрыть</button>
    </div>
</div>
