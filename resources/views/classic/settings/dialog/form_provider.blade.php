<div
    id="{{ $class }}"
    class="dialog" style="width:380px;">
    <div class="titlebar">Заявка </div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia()">×</button>
{{--    <label for="theme-list" class="form-control">Выберите тему обращения</label>--}}
{{--    <select class="form-control" name="theme-list" id="theme-list">--}}
{{--        <option value="provider">Поставщики</option>--}}
{{--        <option value="payment">Способы оплаты</option>--}}
{{--    </select>--}}
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
            <button class="button white" onclick="{{ $class }}.finitaLaComedia()">Закрыть</button>
            <button class="button primary pull-right" onclick="{{ $class }}.save(this)">Отправить</button>
        </div>
        <div class="system_message">

        </div>
    </form>
</div>

