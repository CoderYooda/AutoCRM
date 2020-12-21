<div id="selectWarrantDialog" class="dialog" style="width:600px;">

    <div class="titlebar">Выбор {{ $request->isIncoming ? 'приходного' : 'расходного' }} ордера</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia();">×</button>
    <div class="modal-header">
        <form onsubmit="{{ $class }}.search()" class="flex d-flex w-100 WarrantStoredListner">
            @if($request['refer'])
                <input id="refer" type="hidden" name="refer" value="{{ $request['refer'] }}">
            @endif

            <input type="hidden" name="isIncoming" value="{{ $request->isIncoming }}">

            <input id="search" name="search" type="text" class="form-control search" placeholder="Поиск {{ $request->isIncoming ? 'приходных' : 'расходных' }} ордеров" required>
        </form>
    </div>
    <div id="warrant_list">
        <div id="search_warrant_results" class="row row-sm">
            @include(get_template() . '.warrant.dialog.select_warrant_inner')
        </div>
    </div>
    <div class="modal-footer">
        <button class="button white" onclick="window.{{ $class }}.finitaLaComedia(this)">Закрыть</button>
    </div>
    <div class="system_message">

    </div>
</div>
