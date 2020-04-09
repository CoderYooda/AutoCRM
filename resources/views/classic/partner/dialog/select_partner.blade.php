<div id="selectPartnerDialog" class="dialog PartnerStoredListner" style="width:800px;">
    <div class="titlebar">Выбор контакта</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia();">×</button>
    <div class="modal-header">
        <form class="flex d-flex w-100">
            @if($request['refer'])
                <input id="refer" type="hidden" name="refer" value="{{ $request['refer'] }}">
            @endif
            @if($request['target'])
                <input id="target" type="hidden" name="target" value="{{ $request['target'] }}">
            @endif
            <input id="partner_search" type="text" class="form-control mr-15" placeholder="Поиск контактов" required="">
            <button onclick="openDialog('partnerDialog')" class="button" type="button">Новый контакт</button>
        </form>
    </div>
    <div id="partner_list">
        <div id="search_partner_results" class="row row-sm">
            @include(env('DEFAULT_THEME', 'classic') . '.partner.dialog.select_partner_inner')
        </div>
    </div>
    <div class="modal-footer">
        <button class="button white" onclick="window.{{ $class }}.finitaLaComedia(this)">Закрыть</button>
    </div>
    <div class="system_message">

    </div>
</div>
