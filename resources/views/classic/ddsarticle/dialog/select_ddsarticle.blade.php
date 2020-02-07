@php $class = 'selectDdsarticleDialog' @endphp
<div id="selectDdsarticleDialog" class="dialog" style="width:450px;">
    <div class="titlebar">Выбор статьи</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia();">×</button>
    <div class="modal-header">
        <form class="flex d-flex w-100">
            @if($request['refer'])
                <input id="refer" type="hidden" name="refer" value="{{ $request['refer'] }}">
            @endif

            <input id="ddsarticle_search" type="text" class="form-control mr-15" placeholder="Поиск статьи" required="">
                <button onclick="openDialog('ddsarticleDialog')" class="button" type="button">Новая статья</button>
        </form>
    </div>
    <div id="ddsarticle_list">
        <div id="search_ddsarticle_results">
            @include(env('DEFAULT_THEME', 'classic') . '.ddsarticle.dialog.select_ddsarticle_inner')
        </div>
    </div>
    <div class="modal-footer">
        <button class="button white" onclick="window.{{ $class }}.finitaLaComedia(this)">Закрыть</button>
    </div>
    <div class="system_message"></div>
</div>
