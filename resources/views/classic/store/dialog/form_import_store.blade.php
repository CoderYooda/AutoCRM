<div id="{{ $class }}" class="dialog" style="width:400px;">
    <div class="titlebar">Импорт товаров на склад</div>

    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>

    <form id="form-import">

        <input type="hidden" name="id" value="">
        <input type="file" onchange="{{ $class }}.changeFile(this)" name="file" style="display: none;" />

        <div data-simplebar class="modal-body" style="max-height: 400px;">
            <div class="box-body pb-0 mb-15">
                <div class="no-gutters align-items-stretch">

                    <div id="hide-inputs">

                        <div class="form-groupinactiveProgress">
                            <label>Выбор файла</label>
                            <div class="input-group mb-15">
                                <input type="text" id="file-name" onclick="{{ $class }}.openFileSelector()" class="form-control pointer phone_input" placeholder="Название файла" disabled>
                                <button onclick="{{ $class }}.openFileSelector()" class="button primary ml-15">Обзор...</button>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Выбор магазина</label>
                            <div class="input-group mb-15">
                                <div style="z-index: 9999;" class="dropdown w-100" onclick="window.helper.openModal(this, event)">
                                    <input id="store-name" onclick="event.preventDefault()" placeholder="Выберите магазин" class="form-control pointer text-left button_select" disabled>
                                    <div class="dropdown_container">
                                        <div class="arrow"></div>
                                        @foreach($stores as $store)
                                            <span onclick="{{ $class }}.selectStore(this, {{ $store->id }})" class="element">{{ $store->name }}</span>
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <progress id="progressbar" max="100" value="0" style="width: 100%; height: 30px; display: none;">
                        Загружено на <span id="value">25</span>%
                    </progress>

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
