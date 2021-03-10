<div id="selectEntranceDialog" class="dialog" style="width:600px;">
    <div id="select_entrance_container" class="select_entrance_container fade" data-simplebar style="height: 400px;">
        <div class="cont"></div>
        <div class="empty_desc">
            <div class="out_of_search"></div>
            <div class="text-center">Товаров нет</div>
        </div>
    </div>
    <div class="titlebar">Выбор поступления</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia();">×</button>
    <div class="modal-header">
        <form class="flex d-flex w-100 EntranceStoredListner">
            @if($request['refer'])
                <input id="refer" type="hidden" name="refer" value="{{ $request['refer'] }}">
            @endif
            @if($request['target'])
                <input id="target" type="hidden" name="target" value="{{ $request['target'] }}">
            @endif
            <input id="selectentrance_search" type="text" class="form-control search" placeholder="Поиск поступлений" required="">
        </form>
    </div>
    <div id="entrance_list">
        <div id="search_entrance_results" class="row row-sm">
            @include(get_template() . '.entrance.dialog.select_entrance_inner')
        </div>
    </div>
    <div class="modal-footer">
        <button class="button white" onclick="window.{{ $class }}.finitaLaComedia(this)">Закрыть</button>
    </div>
    <div class="system_message">

    </div>
</div>
