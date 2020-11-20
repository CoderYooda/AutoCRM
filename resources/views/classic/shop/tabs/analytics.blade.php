{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.shop.layout.tabs')

@section('title', $page ?? 'Интернет-магазин')

@section('tab')

    <div id="ajax-shop-warranty" class="bottom-container" style="height: calc(100% - 79px) !important;">

        <div class="box w-100 m-15 p-15">

            <form action="{{ route('ShopUpdateAnalytics') }}" method="POST">

                <h2 class="mt-0 style_header">Аналитика</h2>

                <div class="form-group mt-10">
                    <label>Код верификации Yandex</label>
                    <input type="text" name="yandex_verification" placeholder="3609912de29702c5" class="form-control" value="{{ $shop->yandex_verification ?? '' }}">
                </div>

                <div class="form-group">
                    <label>Код метрики Yandex</label>
                    <input type="text" name="yandex_metrics" placeholder="69589330" class="form-control" value="{{ $shop->yandex_metrics ?? '' }}">
                </div>

                <div>
                    <button type="button" onclick="{{ $class }}.saveAnalytics(this);" class="button primary">Сохранить</button>
                </div>

            </form>

        </div>

    </div>

@endsection

