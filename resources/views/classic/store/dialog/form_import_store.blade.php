<div id="{{ $class }}" class="dialog" style="width:400px;">
    <div class="titlebar">Импорт товаров в '{{ $store->name }}'</div>

    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>

    <form id="form-import">

        <input type="hidden" name="id" value="{{ $store->id }}">

        <div data-simplebar class="modal-body" style="max-height: 400px;">
            <div class="box-body pb-0 mb-15">
                <div class="no-gutters align-items-stretch">

                    <div class="form-group">
                        <label for="category_id">Выбери файл для импорта</label>
                        <input type="file" name="file" class="form-control " />
                    </div>

                </div>
            </div>
        </div>

        <div class="modal-footer">
            <button type="submit" onclick="{{ $class }}.finitaLaComedia()" class="button white">Закрыть</button>
            <button type="submit" onclick="{{ $class }}.save()" class="button pull-right">Начать</button>
        </div>

        <div class="system_message"></div>
    </form>
</div>
