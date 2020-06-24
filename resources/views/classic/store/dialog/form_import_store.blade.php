<div id="{{ $class }}" class="dialog" style="width:400px;">
    <div class="titlebar">Импорт товаров на склад</div>

    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>

    <form id="form-import">

        <input type="hidden" name="id" value="">
        <input type="file" name="file" style="display: none;" />

        <div data-simplebar class="modal-body" style="max-height: 400px;">
            <div class="box-body pb-0 mb-15">
                <div class="no-gutters align-items-stretch">

                    <div class="form-group">
                        <label>Выбор файла</label>
                        <div class="input-group mb-15">
                            <input type="text" class="form-control phone_input" placeholder="Название файла">
                            <button class="button primary ml-15">Обзор...</button>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Выбор магазина</label>
                        <div class="input-group mb-15">
                            <button type="button" class="category_select form-control text-left button_select">Название магазина</button>
                        </div>
                    </div>

                    <div id="page" class="page">
                        <div class="progress-bar">
                            <canvas id="inactiveProgress" class="progress-inactive" height="275px" width="275px"></canvas>
                            <canvas id="activeProgress" class="progress-active"  height="275px" width="275px"></canvas>
                            <p>0%</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="modal-footer">
            <button type="submit" onclick="{{ $class }}.finitaLaComedia()" class="button white">Закрыть</button>
            <button type="submit" onclick="{{ $class }}.save()" class="button pull-right">Импортировать товар</button>
        </div>

        <div class="system_message"></div>
    </form>
</div>
