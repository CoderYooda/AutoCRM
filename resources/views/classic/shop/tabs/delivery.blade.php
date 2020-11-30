{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.shop.layout.tabs')

@section('title', $page ?? 'Оплата и доставка')

@section('tab')

    <div id="ajax-shop-delivery" class="bottom-container" style="height: calc(100% - 79px) !important;">

        <div class="box w-100 m-15 p-15">

            <form action="{{ route('ShopUpdateDelivery') }}" method="POST">

                <h2 class="mt-0 style_header">Оплата и доставка</h2>

                <div class="form-group mt-10">
                    <label>Способы оплаты и доставки</label>
                    <div data-error="delivery_desc" style="max-width: 800px;">
                        <div id="editor">{!! $shop->delivery_desc ?? '' !!}</div>
                    </div>
                </div>

                <div class="form-group">
                    <label>SEO Заголовок</label>
                    <textarea name="seo_delivery_title" class="form-control resize-none" rows="4" placeholder="Заголовок">{{ $shop->seo_delivery_title ?? '' }}</textarea>
                </div>

                <div class="form-group">
                    <label>SEO Описание</label>
                    <textarea name="seo_delivery_desc" class="form-control resize-none" rows="4" placeholder="Описание">{{ $shop->seo_delivery_desc ?? '' }}</textarea>
                </div>

                <div>
                    <button type="button" onclick="{{ $class }}.saveDelivery(this);" class="button primary">Сохранить</button>
                </div>

            </form>

        </div>

    </div>

@endsection

