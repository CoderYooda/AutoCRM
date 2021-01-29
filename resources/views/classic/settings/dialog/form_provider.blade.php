<div
    id="providerDialog"
    class="dialog" style="width:380px;">
    <div class="titlebar">Заявка на подключение поставщика</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('providerDialog')">_</button>
    <button class="btn_close" onclick="window.providerDialog.finitaLaComedia()">×</button>
    <form action="{{route('SendEmail')}}" method="post">
        <div class="modal-body">
            <div class="p-15">
                @csrf
                <div class="form-group mb-0">
                    <label for="category_id">Если ваших поставщиков у нас нет, напишите его сайт и мы добавим</label>
                    <textarea name="text" class="form-control" placeholder="Адреса сайтов через запятую" autofocus></textarea>
                </div>
            </div>
        </div>

        <div class="modal-footer">
            <button class="button white" onclick="providerDialog.finitaLaComedia()">Закрыть</button>
            <button class="button primary pull-right" onclick="providerDialog.save(this)">Отправить</button>
        </div>
        <div class="system_message">

        </div>
    </form>
</div>
