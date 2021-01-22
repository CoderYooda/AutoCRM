{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.shop.layout.tabs')

@section('title', $page ?? 'Интернет-магазин | Основное')

@section('tab')

    <div id="ajax-shop-main" class="bottom-container" style="height: calc(100% - 30px) !important;">

        <div class="box w-100 m-15">

            <form action="{{ route('ShopUpdateMain') }}" method="POST">

                <div class="d-flex p-15">

                    <div class="flex-1 pr-10">

                        <div class="form-group">

                            <label>Название магазина</label>
                            <div class="input-group">
                                <input class="w-100" type="text" name="name" placeholder="Рога и Копыта" value="{{ $shop->name ?? '' }}" />
                            </div>

                        </div>

                        <div class="form-group mb-0">

                            <label>Адрес сайта</label>

                            <div class="domain_types">

                                <div class="input-group d-flex our @if($shop && $shop->domain_type != 'our') d-none @endif">
                                    <input class="flex-4" type="text" name="subdomain" placeholder="example" value="{{ $shop->subdomain ?? '' }}" />
                                    <span class="flex-1 our_domain">.bbcrm.ru</span>
                                </div>

                                <div class="input-group d-flex private @if(!$shop || $shop->domain_type != 'private') d-none @endif">
                                    <input class="flex-4" type="text" name="domain" placeholder="www.domain.ru" value="{{ $shop->domain ?? '' }}" />
                                </div>

                            </div>

                            <div class="input-group mt-10">

                                <div class="d-flex align-items-center">
                                    <label class="mr-5">Выбрать у нас</label>

                                    <label class="custom_checkbox radio">
                                        <input type="radio" class="not_default" onchange="{{ $class }}.changeDomainType(this);" name="domain_type" @if(!$shop || $shop->domain_type == 'our') checked @endif value="our" />
                                        <span></span>
                                    </label>
                                </div>

                                <div class="d-flex align-items-center ml-15">
                                    <label class="mr-5">Свой домен</label>

                                    <label class="custom_checkbox radio">
                                        <input type="radio" class="not_default" onchange="{{ $class }}.changeDomainType(this);" name="domain_type" @if($shop && $shop->domain_type == 'private') checked @endif value="private" />
                                        <span></span>
                                    </label>
                                </div>

                            </div>

                        </div>

                        <div class="separator">

                            <div></div>

                        </div>

                        <div class="form-group addable">

                            <label>Email адрес для заказов <span onclick="{{ $class }}.addEmail(this)" class="input_as_link pointer">добавить ещё</span></label>

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

                    </div>

                    <div class="flex-1 pl-10">

                        <div class="box box-gray p-15 mt-30">

                            <div class="form-group d-flex">

                                <label class="custom_checkbox">
                                    <input type="checkbox" class="not_default" name="show_empty" @if($shop->show_empty ?? true) checked @endif value="1" />
                                    <span></span>
                                </label>

                                <label class="pl-15">Показывать товары, которых нет в наличии</label>

                            </div>

                            <div class="form-group d-flex">

                                <label class="custom_checkbox">
                                    <input type="checkbox" class="not_default" name="show_amount" @if($shop->show_amount ?? true) checked @endif value="1" />
                                    <span></span>
                                </label>

                                <label class="pl-15">Показывать количество товаров в наличии</label>

                            </div>

                        </div>

                        <div class="box box-gray p-15 mt-30">

                            <div class="form-group mb-0 d-flex">

                                <label class="custom_checkbox">
                                    <input type="checkbox" class="not_default" name="supplier_offers" @if($shop->supplier_offers ?? true) checked @endif onchange="{{ $class }}.toggleSupplierOffers(this);" value="1" />
                                    <span></span>
                                </label>

                                <label class="pl-15">Показывать предложения поставщиков</label>

                            </div>

                            <div class="form-group">

                                <div class="select_supplier @if(!$shop || !$shop->supplier_offers) d-none @endif">
                                    <label>Источник наценки к стоимости товара</label>
                                    <div class="input-group">
                                        <select custom_select name="price_id">
                                            @foreach($prices as $price)
                                                <option @if($shop && $shop->price_id == $price->id) selected @endif value="{{ $price->id }}">{{ $price->name }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div class="form-group ml-15">
                    <button type="button" onclick="{{ $class }}.saveMain(this);" class="button primary">Сохранить</button>
                </div>

            </form>

        </div>

    </div>

@endsection

