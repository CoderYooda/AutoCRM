@php $class = 'selectCashboxDialog' @endphp
<div id="selectCashboxDialog" class="dialog" style="width:450px;">
    <div class="titlebar">Выбор кассового аппарата</div>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia();">×</button>
    <div class="navbar white no-radius box-shadow pos-rlt">
        <form class="flex">
            @if($request['refer'])
                <input id="refer" type="hidden" name="refer" value="{{ $request['refer'] }}">
            @endif
            @if($request['type'])
                <input id="type" type="hidden" name="type" value="{{ $request['type'] }}">
            @endif
            <div class="input-group">
                <input id="cashbox_search" type="text" class="form-control form-control-sm search" placeholder="Поиск кассового аппарата" required="">
                <span class="input-group-append">
                    <button onclick="openDialog('cashboxDialog')" class="btn btn-default btn-sm no-shadow" type="button">Новый кассовый аппарат</button>
                </span>
            </div>
        </form>
    </div>
    <div id="partner_list" class="mh50-dialog">
        <div class="">
            <div id="search_cashbox_results" class="nlborder box mb-0">
                @include('settings.dialog.select_cashbox_inner')
            </div>
        </div>
    </div>
    <div class="modal-footer white">
        <button class="btn success" onclick="window.{{ $class }}.finitaLaComedia(this)">Закрыть</button>
    </div>
    <div class="system_message">

    </div>
</div>
