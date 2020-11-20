{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.shop.layout.tabs')

@section('title', $page ?? 'Интернет-магазин')

@section('tab')

    <div id="ajax-shop-about" class="bottom-container" style="height: calc(100% - 79px) !important;">

        <div class="box w-100 m-15 p-15">

            <form action="{{ route('ShopUpdateAbout') }}" method="POST">

                <h2 class="mt-0 style_header">О компании</h2>

                <div class="form-group mt-10">
                    <label>Описание компании</label>
                    <div data-error="about_desc">
                        <div id="editor">{!! $shop->about_desc ?? '' !!}</div>
                    </div>
                </div>

                <div class="form-group">

                    <label>Фотографии</label>

                    <div class="images">

                        <div class="image upload pointer" onclick="{{ $class }}.selectFiles(this);">
                            <input type="file" class="d-none" onchange="{{ $class }}.uploadFiles(this);" multiple accept="image/jpeg,image/png,image/gif">
                        </div>

                        <div class="image relative copy d-none">

                            <button type="button" class="right-remove" onclick="{{ $class }}.removeImage(this);">
                                <i class="fa fa-trash" aria-hidden="true"></i>
                            </button>

                            <img src=""  alt=""/>
                        </div>

                        @if($shop)
                            @foreach($shop->aboutImages as $image)

                                <div class="image relative">

                                    <button data-id="{{ $image->id }}" type="button" class="right-remove" onclick="{{ $class }}.removeImage(this);">
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </button>

                                    <img src="{{ $image->url }}"  alt="" />
                                </div>

                            @endforeach
                        @endif
                    </div>

                </div>

                <div class="form-group">
                    <label>SEO Заголовок</label>
                    <textarea name="seo_about_title" class="form-control resize-none" rows="4" placeholder="Заголовок">{{ $shop->seo_about_title ?? '' }}</textarea>
                </div>

                <div class="form-group">
                    <label>SEO Описание</label>
                    <textarea name="seo_about_desc" class="form-control resize-none" rows="4" placeholder="Описание">{{ $shop->seo_about_desc ?? '' }}</textarea>
                </div>

                <div>
                    <button type="button" onclick="{{ $class }}.saveAbout(this);" class="button primary">Сохранить</button>
                </div>

            </form>

        </div>

    </div>

@endsection

