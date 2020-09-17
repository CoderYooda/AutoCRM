<div class="tab-pane p-3" id="{{$class}}_tab_shop">

    @if($company->getSettingField('Интернет магазин'))

        <div id="shop_tabs" class="d-flex tab_links">
            <a href="#" class="mr-10 active" data-target="tab_main">Основное</a>
            <a href="#" data-target="tab_settings">Настройки магазина</a>
        </div>

        <div data-simplebar style="height: 310px;">

            <div id="tab_main" class="tab active">

                <div class="mt-15" style="height: 36px;">
                    <textarea type="text" name="shop[name]" cols="2" class="form-control resize-none border-radius-none shop_name" placeholder="Наименование продукта">{{ $product->sp_name ?? $product->name ?? '' }}</textarea>
                </div>

                <div class="d-flex mt-10">
                    <div class="flex-1">
                        <label class="mb-5">Основное фото</label>
                        <div style="width: 110px; height: 110px;">
                            <img class="h-100 w-100" src="{{ $product->image_path }}"/>
                        </div>
                        <label class="upload_file pointer" for="shop[image]">Файл не выбран<div></div></label>
                        <input type="file" id="shop[image]" name="shop[image]" onclick="{{ $class }}.clickFile(this);" onchange="{{ $class }}.changeFile(this);" accept="image/jpeg,image/png,image/gif" hidden/>
                    </div>
                    <div class="flex-3 ml-10">
                        <label class="mb-5">Описание продукта</label>
                        <textarea class="form-control p-5 resize-none border-radius-none" name="shop[desc]" placeholder="Введите описание" style="height: 130px;">{{ $product->sp_desc ?? '' }}</textarea>
                    </div>
                </div>

                <div class="form-group">
                    <label>Характеристики</label>

                    <a href="#" onclick="{{ $class }}.addSpecificationField(this);" class="float-right">Добавить</a>

                    <div class="specifications">

                        <div class="element copy d-flex d-none">

                            <div>
                                <span>Наименование</span>
                                <span class="mt-5">Значение</span>
                            </div>

                            <div class="ml-15">
                                <input type="text" name="" class="form-control" placeholder="Вяскость" disabled>
                                <input type="text" name="" class="form-control mt-5" placeholder="5W40" disabled>
                            </div>

                            <div class="remove pointer ml-10" onclick="{{ $class }}.removeSpecification(this);"></div>

                        </div>

                    </div>
                </div>

            </div>

            <div id="tab_settings" class="tab">

                <div class="elements mt-15">

                    @foreach($stores as $store)

                        <div class="element relative">
                            <div class="element-title">
                                <span>{{ $store->name }}</span>
                            </div>
                            <i class="fa fa-angle-down pointer fa-5" aria-hidden="true" onclick="{{ $class }}.toggleShopSettings(this, {{ $store->id }});"></i>
                        </div>

                        <div id="toggle_{{ $store->id }}" class="toggleable d-flex p-10 d-none">

                            <div class="flex-2 d-flex flex-column">
                                @foreach(['Показать если нет в наличии', 'Акционный товар', 'Показать на главной странице'] as $field)
                                    <div>
                                        <span>{{ $field }}</span>
                                    </div>
                                @endforeach
                            </div>

                            <div class="flex-1 d-flex flex-column">
                                @foreach(['sp_empty', 'sp_stock', 'sp_main'] as $field)
                                    <div style="margin-left: auto;">
                                        <label class="custom_checkbox mb-0">
                                            <input type="checkbox" class="not_default" name="shop[product_settings][{{ $store->id }}][{{ $field }}]" />
                                            <span></span>
                                        </label>
                                    </div>
                                @endforeach
                            </div>

                        </div>

                    @endforeach

                </div>

            </div>

        </div>

    @else

        <div>Активируйте интернет-магазин в <a class="ajax-nav" href="http://bbcrm/settings?active_tab=index">настройках</a>.</div>
        <div>Это бесплатно.</div>

    @endif

</div>
