{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.shop.layout.tabs')

@section('title', $page ?? 'Интернет-магазин | Внешний вид')

@section('tab')

    <div id="ajax-shop-appearance" class="bottom-container" style="height: calc(100% - 30px) !important;">

        <div class="box m-15 p-15 w-100">

            <div class="form-group">

                <label>Шапка сайта</label>

                <div class="d-flex">

                    <div>
                        <div class=""
                    </div>

                    <div>
                        <img class="image_main" src="{{ $shop->backgroundImage->path ?? 'http://via.placeholder.com/1920x500' }}" />
                    </div>

                </div>

            </div>

        </div>

    </div>

@endsection

