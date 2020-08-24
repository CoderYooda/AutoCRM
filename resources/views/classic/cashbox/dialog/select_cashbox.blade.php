@php $class = 'selectCashboxDialog' @endphp
<div id="selectCashboxDialog" class="dialog" style="width:450px;">
    <div class="titlebar">Выбор кассового аппарата</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia();">×</button>
    @if($request['type'] != null)
        <input name="type" type="hidden" value="{{ $request['type'] }}">
    @else
        <input name="type" type="hidden" value="">
    @endif
    @if($request['refer'])
        <input id="refer" type="hidden" name="refer" value="{{ $request['refer'] }}">
    @endif
    @if($request['type'])
        <input id="type" type="hidden" name="type" value="{{ $request['type'] }}">
    @endif

    <div class="modal-header">
        <form class="flex d-flex w-100">
            <input id="cashbox_search" type="text"  name="cashbox_search" class="form-control form-control-sm search mr-15" placeholder="Поиск кассы">
            <button onclick="openDialog('cashboxDialog')" class="button" type="button">Новый кассовый аппарат</button>
        </form>
    </div>

    <div id="partner_list" class="mh50-dialog">
        <div id="search_cashbox_results">
            @include(get_template() . '.cashbox.dialog.select_cashbox_inner')
        </div>
    </div>
    <div class="modal-footer white">
        <button class="button white" onclick="window.{{ $class }}.finitaLaComedia(this)">Закрыть</button>
    </div>
    <div class="system_message">

    </div>
</div>
