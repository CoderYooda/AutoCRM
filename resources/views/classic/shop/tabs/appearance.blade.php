{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.shop.layout.tabs')

@section('title', $page ?? 'Интернет-магазин | Внешний вид')

@section('tab')

    <div id="ajax-shop-appearance" class="bottom-container" style="height: calc(100% - 30px) !important;">

        <div class="box m-15 p-15 w-100">

            <div class="form-group">

                <label>Шапка сайта</label>

                <div class="d-flex">

                    <div class="info">
                        <div class="upload"></div>
                        <div class="desc">Файл должен содержать размеры 1920х220</div>
                    </div>

                    <div class="image_container">
                        <img class="image" style="max-height: 100px;" src="{{ $shop->backgroundImage->path ?? 'http://via.placeholder.com/1920x220' }}" />
                    </div>

                </div>

            </div>

            <div class="form-group">

                <label>Фоновое изображение</label>

                <div class="d-flex">

                    <div class="info">
                        <div class="upload"></div>
                        <div class="desc">Файл должен содержать размеры 1920х500</div>
                    </div>

                    <div class="image_container">
                        <img class="image" style="max-height: 150px;" src="{{ $shop->backgroundImage->path ?? 'http://via.placeholder.com/1920x500' }}" />
                    </div>

                </div>

            </div>

            <div class="d-flex">

                <div class="flex-1">

                    <label>Шапка сайта</label>

                    <div class="d-flex">

                        <div class="info">
                            <div class="upload"></div>
                            <div class="desc">Файл должен содержать размеры 52x52</div>
                        </div>

                        <div class="image_container">
                            <img class="image" style="max-height: 52px;" src="{{ $shop->backgroundImage->path ?? 'http://via.placeholder.com/52' }}" />
                        </div>

                    </div>

                </div>

                <div class="flex-1">

                    <label>Шапка сайта</label>

                    <div class="d-flex">

                        <div class="info">
                            <div class="upload"></div>
                            <div class="desc">Файл должен содержать размеры 32х32</div>
                        </div>

                        <div class="image_container">
                            <img class="image" style="max-height: 32px;" src="{{ $shop->backgroundImage->path ?? 'http://via.placeholder.com/32' }}" />
                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

@endsection

