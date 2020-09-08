<div id="selectPartnerDialog" class="dialog PartnerStoredListner" style="width:800px;">
    <div class="titlebar">Выбор контакта</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia();">×</button>
    <div class="modal-header">
        <form class="flex d-flex w-100">
            @if($request['only_current_category'])
                <input type="hidden" name="only_current_category" value="1">
            @endif
            @if($request['refer'])
                <input id="refer" type="hidden" name="refer" value="{{ $request['refer'] }}">
            @endif
            @if($request['target'])
                <input id="target" type="hidden" name="target" value="{{ $request['target'] }}">
            @endif
            @if($request['category_id'])
                <input id="category_id" type="hidden" name="category_id" value="{{ $request['category_id'] }}">
            @endif
            <input id="partner_search" type="text" class="form-control search mr-15" placeholder="Поиск контактов" required="">
            <button id="new_btn" onclick="openDialog('partnerDialog', '&category_select={{ $categories['parent']->id }}' )" class="button" type="button">Новый контакт</button>
        </form>
    </div>
    <div id="partner_list">
        <div id="search_partner_results" class="row row-sm">
            @include(get_template() . '.partner.dialog.select_partner_inner')
        </div>
    </div>
    <div class="modal-footer">
        <button class="button white" onclick="window.{{ $class }}.finitaLaComedia(this)">Закрыть</button>
    </div>
    <div class="system_message">

    </div>
</div>
