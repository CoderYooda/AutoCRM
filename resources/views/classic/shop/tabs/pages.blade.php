{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.shop.layout.tabs')

@section('title', $page ?? 'Интернет-магазин | Страницы')

@section('tab')

    <div id="ajax-shop-pages" class="bottom-container" style="height: calc(100% - 30px) !important;">

        <div class="box m-15 p-15 w-100">

            <div class="w-80">

                <div class="form-group">
                    <label>Описание компании</label>
                    <div data-error="about_desc">
                        <div id="editor">{!! $shop->about_desc ?? '' !!}</div>
                    </div>
                </div>

                <div class="form-group">

                    <label>SEO Заголовок</label>

                    <div class="input-group">
                        <textarea class="form-control resize-none" rows="4">{{ $shop->seo_about_title ?? '' }}</textarea>
                    </div>

                </div>

                <div class="form-group">

                    <label>SEO Описание</label>

                    <div class="input-group">
                        <textarea class="form-control resize-none" rows="4">{{ $shop->seo_about_desc ?? '' }}</textarea>
                    </div>

                </div>`

            </div>

        </div>

    </div>

@endsection

