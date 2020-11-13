<div class="tab-pane p-3" id="{{ $class }}_tab_shop">

    @if($company->getSettingField('Интернет магазин'))

        <div id="tab_main" data-simplebar style="height: 310px;">

            <label>Настройки продукта</label>
            <div class="shop_params">

                @foreach($shopFields as $field => $params)

                    <div class="form-group relative">
                        <div>
                            <span>{{ $params['name'] }}</span>
                        </div>
                        <label class="absolute custom_checkbox" style="right: 0; top: 3px;">
                            <input type="checkbox" class="not_default" name="shop[settings][{{ $field }}]" @isset($params['onclick']) onclick="{{ $class . '.' . $params['onclick'] }}(this);" @endisset @if($product && $product->$field) checked @endif />
                            <span></span>
                        </label>
                    </div>

                @endforeach

                <div class="stocks @if($product && !$product->sp_stock) d-none @endif">
                    <div class="flex-1">
                        <div class="form-group">
                            <label>Цена</label>
                        </div>

                        <div class="form-group">
                            <label>Скидка</label>
                        </div>

                        <div class="form-group">
                            <label>Итого</label>
                        </div>
                    </div>

                    <div class="flex-3">
                        <div class="form-group">
                            <input type="number" class="form-control price" name="shop[discounts][price]" value="{{ $product ? $product->getPrice() : 0 }}" disabled />
                        </div>

                        <div class="form-group d-flex">
                            <div class="flex-1">
                                <input type="number" class="form-control discount" name="shop[discounts][discount]" value="{{ $product->sp_discount ?? 0 }}" />
                            </div>

                            <div class="ml-5 flex-1">
                                <select class="type" custom_select onchange="{{ $class }}.recalculateShopDiscountDebounce();" name="shop[discounts][type]">
                                    @foreach(['В рублях', 'В процентах'] as $index => $name)
                                        <option @if($product && $product->getStoreDiscountType() == $index) selected @endif value="{{ $index }}">{{ $name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <input type="number" class="form-control total" name="shop[discounts][total]" value="{{ $product->sp_discount_total ?? 0 }}" disabled />
                        </div>
                    </div>
                </div>

            </div>

            <label class="mt-8">Наименование продукта</label>
            <div style="height: 36px;">
                <textarea type="text" name="shop[name]" cols="2" class="form-control resize-none border-radius-none shop_name" placeholder="Наименование продукта">{{ $product->sp_name ?? $product->name ?? '' }}</textarea>
            </div>

            <div class="d-flex mt-10">
                <div class="flex-1">
                    <label class="mb-5">Основное фото</label>
                    <div style="width: 110px; height: 110px;">
                        <img class="h-100 w-100 image" src="{{ $product->image_path ?? asset('/images/product-placeholder.svg') }}" />
                    </div>
                    <label class="upload_file pointer" for="shop[image]">Выберите файл<div></div></label>
                    <input type="file" id="shop[image]" onchange="{{ $class }}.changeFile(this);" accept="image/jpeg,image/png,image/gif" hidden/>
                    <input type="hidden" name="image_id" value="{{ $product->image->id ?? null }}" />
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
                            <input type="text" name="" class="form-control" placeholder="Вязкость" disabled>
                            <input type="text" name="" class="form-control mt-5" placeholder="5W40" disabled>
                        </div>

                        <div class="remove pointer ml-10" onclick="{{ $class }}.removeSpecification(this);"></div>

                    </div>

                    @isset($product->specifications)
                        @foreach($product->specifications as $specification)

                            <div class="element d-flex">

                                <div>
                                    <span>Наименование</span>
                                    <span class="mt-5">Значение</span>
                                </div>

                                <div class="ml-15">
                                    <input type="text" name="shop[specifications][{{ $loop->index }}][label]" class="form-control" placeholder="Вязкость" value="{{ $specification->label }}">
                                    <input type="text" name="shop[specifications][{{ $loop->index }}][value]" class="form-control mt-5" placeholder="5W40" value="{{ $specification->value }}">
                                </div>

                                <div class="remove pointer ml-10" onclick="{{ $class }}.removeSpecification(this);"></div>

                            </div>

                        @endforeach
                    @endisset

                </div>

            </div>

        </div>

    @else

        <div>Активируйте интернет-магазин в <a class="ajax-nav" href="{{ route('SettingsIndex', ['active_tab' => 'index']) }}">настройках</a>.</div>
        <div>Это бесплатно.</div>

    @endif

</div>
