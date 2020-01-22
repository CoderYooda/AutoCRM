@php $class = 'selectPartnerDialog' @endphp
<div id="selectPartnerDialog" class="dialog PartnerStoredListner" style="width:640px;">
    <div class="titlebar">Выбор контрагента</div>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia();">×</button>
    <div class="modal-header">
        <form class="flex d-flex w-100">
            @if($request['refer'])
                <input id="refer" type="hidden" name="refer" value="{{ $request['refer'] }}">
            @endif
            @if($request['target'])
                <input id="target" type="hidden" name="target" value="{{ $request['target'] }}">
            @endif

            <input id="partner_search" type="text" class="form-control mr-15" placeholder="Поиск контрагентов" required="">
            <span class="input-group-append">
                <button onclick="openDialog('partnerDialog')" class="button" type="button">Новый контрагент</button>
            </span>

        </form>
    </div>
    <div id="partner_list">
        <div id="search_partner_results">
            @include(env('DEFAULT_THEME', 'classic') . '.partner.dialog.select_partner_inner')
        </div>
    </div>
    <div class="modal-footer">
        <button class="button white" onclick="window.{{ $class }}.finitaLaComedia(this)">Закрыть</button>
    </div>
    <div class="system_message">

    </div>
</div>
