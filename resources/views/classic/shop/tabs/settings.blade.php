{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.shop.layout.tabs')

@section('title', $page ?? 'Интернет-магазин')

@section('tab')

    <div id="ajax-shop-settings" class="bottom-container" style="height: calc(100% - 79px) !important;">

        <div data-simplebar class="box w-100 m-15 p-15">

            <form action="{{ route('ShopUpdateSettings') }}" method="POST">

                <h2 class="mt-0 style_header">Заказы и каталог</h2>

                <div class="form-group w-350 mt-10 addable" id="emails_addable">
                    <label>Email адрес для заказов <span onclick="{{ $class }}.addEmail(this)" class="input_as_link pointer">добавить</span></label>
                    <div class="emails">
                        @if($shop && count($shop->orderEmails))
                            @foreach($shop->orderEmails as $email)
                                <div class="input-group mb-10 email">
                                    <input type="text" name="emails[{{ $loop->index }}][email]" class="form-control email_input mr-5" placeholder="Email адрес" value="{{ $email->email }}">
                                    <span class="input-group-append" data-toggle="tooltip" data-placement="top" title="Удалить Email адрес">
                                        <button onclick="{{ $class }}.deleteEmail(this)" class="input-group-text butt_del_append" type="button" style="height: auto">
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </span>
                                </div>
                            @endforeach
                        @else
                            <div class="input-group mb-10 email">
                                <input type="text" name="emails[0][email]" class="form-control email_input mr-5" placeholder="Email адрес">
                                <span class="input-group-append" data-toggle="tooltip" data-placement="top" title="Удалить Email адрес">
                                <button onclick="{{ $class }}.deleteEmail(this)" class="input-group-text butt_del_append" type="button" style="height: auto">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </span>
                            </div>
                        @endif
                    </div>
                </div>

                <div class="form-group w-350">
                    <label>Показывать товары, которых нет в наличии</label>
                    <label data-error="show_empty" class="custom_checkbox">
                        <input type="checkbox" class="not_default" name="show_empty" @if($shop->show_empty ?? true) checked @endif value="1" />
                        <span></span>
                    </label>
                </div>

                <div class="form-group w-350">
                    <label>Показывать количество товаров в наличии</label>
                    <label data-error="show_amount" class="custom_checkbox">
                        <input type="checkbox" class="not_default" name="show_amount" @if($shop->show_amount ?? true) checked @endif value="1" />
                        <span></span>
                    </label>
                </div>

                <div class="form-group w-350">
                    <label>Сколько дней хранить не подтвержденные заказы</label>
                    <input type="number" class="form-control" name="storage_days" value="{{ $shop->storage_days ?? 7 }}">
                </div>

                <div class="form-group w-350 d-flex flex-column">

                    <div>
                        <label>Показывать предложения поставщиков</label>

                        <label class="custom_checkbox">
                            <input type="checkbox" name="supplier_offers" class="not_default" @if($shop->supplier_offers ?? true) checked @endif onchange="{{ $class }}.toggleSupplierOffers(this);" value="1" />
                            <span></span>
                        </label>
                    </div>

                    <div class="select_supplier @if(!($shop->supplier_offers ?? true)) d-none @endif">

                        <div class="form-group">
                            <label>Процент наценки стоимости товара у поставщиков</label>
                            <input type="number" class="form-control" name="supplier_percent" value="{{ $shop->supplier_percent ?? 30 }}" />
                        </div>
                    </div>

                </div>

                <h2 class="style_header mb-10">Оформление сайта</h2>

                <div class="form-group w-350 d-flex">

                    <div class="flex-1">
                        <label>Логотип</label>
                        <div class="text-center all-center p-10" style="border: 1px solid #e7e8ec;">
                            <img class="image_main" style="width: 52px; height: 52px;" src="{{ $shop->logotypeImage->image_path ?? 'http://via.placeholder.com/52x52' }}" />
                        </div>

                        <label class="upload_file pointer" for="image_logotype">Файл не выбран<div></div></label>
                        <input type="file" id="image_logotype" onchange="{{ $class }}.changeFile(this);" accept="image/jpeg,image/png" hidden/>
                        <input type="hidden" name="image_logotype_id" value="{{ $shop->logotypeImage->id ?? '' }}">
                    </div>
                </div>

                <div class="form-group w-350 d-flex">
                    <div class="flex-1">
                        <label>Шапка сайта</label>

                        <div class="text-center all-center p-10" style="border: 1px solid #e7e8ec;">
                            <img class="image_main" src="{{ $shop->headerImage->path ?? 'http://via.placeholder.com/1920x220' }}" />
                        </div>

                        <label class="upload_file pointer" for="image_header">Файл не выбран<div></div></label>
                        <input type="file" id="image_header" onchange="{{ $class }}.changeFile(this);" accept="image/jpeg,image/png" hidden/>
                        <input type="hidden" name="image_header_id" value="{{ $shop->headerImage->id ?? '' }}">
                    </div>
                </div>

                <div class="form-group w-350">
                    <label>Фоновое изображение</label>

                    <div class="text-center all-center p-10" style="border: 1px solid #e7e8ec;">
                        <img class="image_main" src="{{ $shop->backgroundImage->path ?? 'http://via.placeholder.com/1920x500' }}" />
                    </div>

                    <label class="upload_file pointer" for="image_background">Файл не выбран<div></div></label>
                    <input type="file" id="image_background" onchange="{{ $class }}.changeFile(this);" accept="image/jpeg,image/png" hidden/>
                    <input type="hidden" name="image_background_id" value="{{ $shop->backgroundImage->id ?? '' }}">
                </div>

                <div class="form-group">
                    <label>Слайдер на главной странице</label>

                    <div class="images">

                        <div class="image upload pointer" onclick="{{ $class }}.selectFiles(this);">
                            <input type="file" class="d-none" onchange="{{ $class }}.uploadFiles(this);" multiple accept="image/jpeg,image/png,image/gif">
                        </div>

                        <div class="image relative mb-5 copy d-flex flex-column d-none">

                            <button type="button" class="right-remove" onclick="{{ $class }}.removeImage(this);">
                                <i class="fa fa-trash" aria-hidden="true"></i>
                            </button>

                            <img src=""  alt=""/>

                            <input type="text" style="width: 125px;" placeholder="Ссылка">
                        </div>

                        @if($shop)
                            @foreach($shop->sliderImages as $image)

                                <div class="image relative mb-5 d-flex flex-column">

                                    <button data-id="{{ $image->id }}" type="button" class="right-remove" onclick="{{ $class }}.removeImage(this);">
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </button>

                                    <img data-index="{{ $loop->index }}" src="{{ $image->url }}"  alt="" />

                                    <input type="text" data-error="image_urls[{{ $loop->index }}]" name="image_urls[{{ $loop->index }}]" class="form-control" style="width: 125px;" placeholder="Ссылка" value="{{ $image->pivot->target_url }}" />
                                </div>

                            @endforeach
                        @endif
                    </div>

                </div>

                <h2 class="style_header mb-10">Адрес сайта</h2>

                <div class="form-group w-350">
                    <label>URL адрес</label>
                    <input type="text" name="subdomain" data-error="subdomain" class="form-control" placeholder="name.bbcrm.ru" value="{{ $shop->subdomain ?? 'name.bbcrm.ru' }}">
                </div>

                <div class="form-group w-350">
                    <label>Свой домен</label>
                    <input type="text" name="domain" data-error="domain" class="form-control" placeholder="www.пример.рф" value="{{ $shop->domain ?? '' }}">
                </div>

                <div class="form-group w-350">
                    <button type="button" onclick="{{ $class }}.saveSettings(this);" class="button primary">Сохранить</button>
                </div>

            </form>

        </div>

    </div>

@endsection

