<div id="createProduct" class="dialog" style="width:600px;">
    <div class="titlebar">Добавление продукта</div>
    <button class="btn_close" onclick="closeDialog(event)">x</button>
    <form action="{{ route('StoreProduct') }}" method="POST">
        <div class="row no-gutters align-items-stretch">
            <div class="col-md-4 light lt">
                <div class="nav-active-border b-success left right box mb-0">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link block active" href="#" data-toggle="tab" data-target="#tab1">
                                Основные
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link block" href="#" data-toggle="tab" data-target="#tab2">
                                Настройка цен
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link block" href="#" data-toggle="tab" data-target="#tab3">
                                Описание
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-md-8 light lt">
                <div class="tab-content p-3 mb-3">
                    <div class="tab-pane animate fadeIn text-muted active" id="tab1">
                        <div class="form-group">
                            <label>Наименование</label>
                            <input type="text" name="name" class="form-control" placeholder="Наименование (не более 255 символов)">
                        </div>
                        <div class="form-group">
                            <label for="category_id">В категории</label>
                            <div class="input-group mb-3">
                                <select name="category_id" class="category_select form-control input-c noarrow fake-disabled" readonly>
                                    <option value="{{ $category->id }}">{{ $category->name }}</option>
                                </select>
                                <div class="input-group-append">
                                    <button onclick="openDialog('selectCategory', 2)" class="btn white" type="button"><i class="fa fa-bars"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Артикул</label>
                            <input type="text" name="article" class="form-control" placeholder="Артикул детали (не более 64 символов)">
                        </div>
                    </div>
                    <div class="tab-pane animate fadeIn text-muted" id="tab2">
                        Components
                    </div>
                    <div class="tab-pane animate fadeIn text-muted" id="tab3">
                        UI kits
                    </div>
                </div>
            </div>
            <div class="col-md-12 p-3">
                <button type="submit" onclick="axform.send(this)" class="btn success pull-right">Сохранить</button>
            </div>
        </div>
    </form>
</div>