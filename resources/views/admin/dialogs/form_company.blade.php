<div id="{{ $class }}" class="dialog" style="width:330px;">
    <div class="titlebar">Информация о компании {{ $company->name }}</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia()">×</button>
    <form action="#" method="POST">

        @csrf

        <div class="modal-footer">
            <button type="button" class="button white" onclick="window.{{ $class }}.finitaLaComedia()">Закрыть</button>
        </div>

        <div class="system_message">
        </div>
    </form>
</div>
