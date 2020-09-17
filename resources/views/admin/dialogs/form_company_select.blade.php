<div id="{{ $class }}" class="dialog select_company_dialog" style="width:330px;">
    <div class="titlebar">Выбор компании</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia()">×</button>
    <form action="#" method="GET">

    <div class="modal-header">
        <form class="flex w-100">
            <input id="search" type="text" onkeyup="{{ $class }}.debounceSearch();" name="search" class="form-control search mr-15" placeholder="Поиск">
        </form>
    </div>

    @if(isset($request['refer']))
        <input id="refer" type="hidden" name="refer" value="{{ $request['refer'] }}">
    @endif
    <div class="box-body inscroll">
        <div data-simplebar style="max-height: 400px">

            @include('admin.dialogs.includes.form_company_select_inner')

        </div>
    </div>

    <div class="modal-footer white">
        <button class="button white" onclick="closeDialog(event)">Закрыть</button>
    </div>

    <div class="system_message">
    </div>

    </form>
</div>
