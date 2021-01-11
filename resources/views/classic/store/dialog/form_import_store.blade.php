<div id="{{ $class }}" class="dialog" style="width:400px;">
    <div class="titlebar">Импорт товаров на склад</div>

    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>

    <form action="/store/import" id="form-import" method="POST">

        <div class="modal-body" style="max-height: 400px;">
            <div class="box-body pb-0 mb-15">
                <div class="no-gutters align-items-stretch">

                    <div id="post-inputs">

                        <div class="form-groupinactiveProgress">
                            <label>
                                Выбор файла
                                <img src="{{ asset('images/icons/statistic-question.svg') }}" alt="">
                            </label>
                            <div class="input-group mb-5">
                                <input type="text" name="file" id="file-name" onclick="{{ $class }}.openFileSelector()" class="pointer form-control text-left button_select" placeholder="Название файла" readonly />
                                <button onclick="{{ $class }}.openFileSelector()" class="button primary ml-15">Обзор...</button>

                                <input type="file" onchange="{{ $class }}.changeFile(this)" name="file" style="display: none;" accept=".xml,.txt,.csv" />

                            </div>
                            <div class="ml-15 mt-10">
                                <div class="file-example-item">
                                    <i class="fa fa-paperclip" aria-hidden="true"></i>
                                    <a style="color: #CCCCCC;" href="{{ asset('demo/example-import.csv') }}" download>Скачать пример формата .csv</a>
                                </div>
                                <div class="file-example-item">
                                    <i class="fa fa-paperclip" aria-hidden="true"></i>
                                    <a style="color: #CCCCCC;" href="{{ asset('demo/example-import.xml') }}" download>Скачать пример формата .xml</a>
                                </div>
                            </div>
                        </div>

                        <div class="form-group mt-15">
                            <label for="store_id">Выбор магазина</label>
                            <div class="input-group mb-15">

                                <select custom_select name="store_id" class="form-control input-c">

                                    @foreach($stores as $store)
                                        <option value="{{ $store->id }}" @if(auth()->user()->current_store == $store->id) selected @endif>{{ $store->name }}</option>
                                    @endforeach

                                </select>

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
                            <div onclick="{{ $class }}.showInfoList(this)" class="input-group">
                                <button type="button" class="form-control button-list">
                                    Просмотр дубликатов <i class="fa fa-chevron-down" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="box pb-15 list d-none">
                                <div class="button-list-title d-flex p-10">
                                    <div style="width: 100px;">Номер строки</div>
                                    <div class="ml-15">Артикул</div>
                                </div>
                                <div data-simplebar class="w-100 p-10 pt-0" style="height: 100px;">
                                    <div class="w-100" id="duplicate-list">

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Ошибки</label>
                            <div onclick="{{ $class }}.showInfoList(this)" class="input-group">
                                <button type="button" class="form-control button-list">
                                    Просмотр ошибок <i class="fa fa-chevron-down" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="box pb-15 d-none">
                                <div class="button-list-title d-flex p-10">
                                    <div style="width: 100px;">Номер строки</div>
                                    <div class="ml-15">Артикул</div>
                                </div>
                                <div data-simplebar class="w-100 p-10 pt-0" style="height: 100px;">
                                    <div class="w-100" id="error-list">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="modal-footer">
            <button type="button" onclick="{{ $class }}.finitaLaComedia()" class="button white">Закрыть</button>
            <button type="button" onclick="{{ $class }}.save(this)" class="button pull-right">Импортировать товар</button>
        </div>

        <div class="system_message"></div>
    </form>
</div>
