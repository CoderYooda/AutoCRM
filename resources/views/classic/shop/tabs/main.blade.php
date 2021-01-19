{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.shop.layout.tabs')

@section('title', $page ?? 'Интернет-магазин')

@section('tab')

    <div id="ajax-shop-about" class="bottom-container" style="height: calc(100% - 30px) !important;">

        <div class="box w-100 m-15">

            <div class="d-flex p-15">

                <div class="flex-1">

                    <div class="form-group">

                        <label>Название магазина</label>
                        <div class="input-group">
                            <input class="w-100" type="text" name="name" placeholder="Рога и Копыта" />
                        </div>

                    </div>

                    <div class="form-group">

                        <label>Адрес сайта</label>
                        <div class="input-group">
                            <input class="w-100" type="text" name="domain" placeholder="www.domain.ru" />
                        </div>

                        <div class="input-group mt-10">

                            <div class="d-flex align-items-center">
                                <label class="mr-10">Выбрать у нас</label>

                                <label class="custom_checkbox">
                                    <input type="radio" class="not_default" name="our_domain" value="1" />
                                    <span></span>
                                </label>
                            </div>

                            <div class="d-flex align-items-center ml-20">
                                <label class="mr-10">Свой домен</label>

                                <label class="custom_checkbox">
                                    <input type="radio" class="not_default" name="our_domain" checked value="1" />
                                    <span></span>
                                </label>
                            </div>

                        </div>

                    </div>

                </div>

                <div class="flex-1">

                </div>

            </div>

        </div>

    </div>

@endsection

