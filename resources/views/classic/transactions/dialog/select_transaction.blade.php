<div id="selectTransactionDialog" class="dialog TransactionStoredListner" style="width:800px;">
    <div class="titlebar">Выбор сделок с клиентами</div>
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
            @if($request['category_id'])
                <input id="category_id" type="hidden" name="category_id" value="{{ $request['category_id'] }}">
            @endif
            <input id="partner_search" type="text" class="form-control search mr-15" placeholder="Поиск контактов" required="">
        </form>
    </div>
    <div id="transaction_list">
        <div id="search_transaction_results" class="row row-sm">
            @include(env('DEFAULT_THEME', 'classic') . '.transactions.dialog.select_transaction_inner')
        </div>
    </div>
    <div class="modal-footer">
        <button class="button white" onclick="window.{{ $class }}.finitaLaComedia(this)">Закрыть</button>
    </div>
    <div class="system_message">

    </div>
</div>
