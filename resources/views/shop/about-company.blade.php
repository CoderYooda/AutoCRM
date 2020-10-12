@extends('shop.layout.app')

@section('content')

    <div class="body">

        @include('shop.includes.breadcrumbs')

        <div class="about container bg-white">
            <div class="title">
                <h2>О компании</h2>
                <div class="d-flex">
                    <div class="text">{!! $shop->about_desc !!}</div>
                    @isset($shop->aboutImages)
                        <div class="main_picture flex-1">
                            <img src="{{ $shop->aboutImages->first()->url }}" alt="">
                        </div>
                    @endisset
                </div>
            </div>
        </div>
        <div class="photo-gallery container bg-white">
            <h2>Фотогалерея</h2>
            <div class="ov-hidden">
                <div class="photos grid-4">
                    <div class="photos-container">
                        @foreach($shop->aboutImages as $image)

                            @continue($loop->first)

                            <div class="photo">
                                <img class="photo-img" title="сюда имя картинки" src="{{ $image->url }}" alt="">
                            </div>
                        @endforeach
                    </div>
                    <div class="controls">
                        <div class="control-item left" onclick="window.gallerySlider.prev()"></div>
                        <div class="pins-container"></div>
                        <div class="control-item right" onclick="window.gallerySlider.next()"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection
