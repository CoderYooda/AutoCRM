{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.shop.layout.tabs')

@section('title', $page ?? 'Интернет-магазин')

@section('tab')

    <div id="ajax-shop-warranty" class="bottom-container" style="height: calc(100% - 79px) !important;">

        <div class="box w-100 m-15 p-15">

            <form action="{{ route('ShopUpdateWarranty') }}" method="POST">

                <div class="form-group">
                    <label>Гарантии и способы возврата</label>
                    <div data-error="warranty_desc">
                        <div id="editor">{!! $shop->warranty_desc ?? '' !!}</div>
                    </div>
                </div>

                <div class="form-group">
                    <label>SEO Заголовок</label>
                    <textarea name="seo_warranty_title" class="form-control resize-none" rows="4" placeholder="Заголовок">{{ $shop->seo_warranty_title ?? '' }}</textarea>
                </div>

                <div class="form-group">
                    <label>SEO Описание</label>
                    <textarea name="seo_warranty_desc" class="form-control resize-none" rows="4" placeholder="Описание">{{ $shop->seo_warranty_desc ?? '' }}</textarea>
                </div>

                <div>
                    <button type="button" onclick="{{ $class }}.saveWarranty(this);" class="button primary">Сохранить</button>
                </div>

            </form>

        </div>

    </div>

@endsection

