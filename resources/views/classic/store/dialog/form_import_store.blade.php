<div id="{{ $class }}" class="dialog" style="width:400px;">
    <div class="titlebar">Импорт товаров на склад</div>

    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>

    <form id="form-import">

        <input type="hidden" name="id" value="">
        <input type="file" onchange="{{ $class }}.changeFile(this)" name="file" style="display: none;" />

        <div class="modal-body" style="max-height: 400px;">
            <div class="box-body pb-0 mb-15">
                <div class="no-gutters align-items-stretch">

                    <div id="post-inputs">

                        <div class="form-groupinactiveProgress">
                            <label>Выбор файла</label>
                            <div class="input-group mb-15">
                                <input type="text" id="file-name" onclick="{{ $class }}.openFileSelector()" class="form-control pointer phone_input" placeholder="Название файла">
                                <button onclick="{{ $class }}.openFileSelector()" class="button primary ml-15">Обзор...</button>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Выбор магазина</label>
                            <div class="input-group mb-15">
                                <div class="dropdown w-100" onclick="window.helper.openModal(this, event)">
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

                    <div class="form-group d-none">
                        <label id="info-text" class="text-center w-100">Обработано на 0%</label>
                        <progress class="w-100" id="progressbar" max="100" value="0" style="height: 30px;"></progress>
                    </div>

                    <div id="result-inputs" class="d-none">
                        <div class="form-group">
                            <label>Дубликаты</label>
                            <div onclick="{{ $class }}.showInfoList('duplicate-list')" class="input-group">
                                <button type="button" class="form-control button-list">
                                    Просмотр дубликатов <i class="fa fa-chevron-down" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="box pb-15 d-none">
                                <div class="button-list-title d-flex p-15">
                                    <div style="width: 100px;">Номер строки</div>
                                    <div class="ml-15">Артикул</div>
                                </div>
                                <div class="pl-15" id="duplicate-list">

                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Ошибки</label>
                            <div onclick="{{ $class }}.showInfoList('error-list')" class="input-group">
                                <button type="button" class="form-control button-list">
                                    Просмотр ошибок <i class="fa fa-chevron-down" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="box pb-15 d-none">
                                <div class="button-list-title d-flex p-15">
                                    <div style="width: 100px;">Номер строки</div>
                                    <div class="ml-15">Артикул</div>
                                </div>
                                <div class="pl-15" id="error-list">

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="modal-footer">
            <button type="submit" onclick="{{ $class }}.finitaLaComedia()" class="button white">Закрыть</button>
            <button type="submit" onclick="{{ $class }}.save(this)" class="button pull-right">Импортировать товар</button>
        </div>

        <div class="system_message"></div>
    </form>
</div>
