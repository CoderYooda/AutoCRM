<div class="tab-pane p-3" id="{{$class}}_tab_shop">

    @if($company->getSettingField('Интернет магазин'))

        <div id="shop_tabs" class="d-flex tab_links" style="margin: 0 22px 10px 22px;">
            <a href="#" class="mr-10 active" data-target="tab_main">Основное</a>
            <a href="#" data-target="tab_settings">Настройки магазина</a>
        </div>

        <div id="tab_main">

            <div class="form-group">
                <label>Показывать на главной странице</label>
                <input class="float-right" type="checkbox" name="main" />
            </div>

            <div class="form-group">
                <label>Показывать, если нет в наличии</label>
                <input class="float-right" type="checkbox" name="show_empty" />
            </div>

            <div class="form-group">
                <label>Акционный товар</label>
                <input class="float-right" type="checkbox" name="stock" />
            </div>

            <div class="form-group">
                <label>Загрузка изображения</label>
                <div class="all-center mb-10">
                    <img style="border: 1px solid #cacece;" src="{{ asset('images/product-placeholder.svg') }}" />
                </div>
                <input class="form-control" type="file" name="image" accept="image/jpg,image/jpeg,image/png,image/gif" />
            </div>

        </div>

        <div id="tab_settings">

            123

        </div>

    @else

        <div>Активируйте интернет-магазин в <a class="ajax-nav" href="http://bbcrm/settings?active_tab=index">настройках</a>.</div>
        <div>Это бесплатно.</div>

    @endif

</div>
