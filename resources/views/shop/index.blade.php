@extends('shop.layout.app')

@section('content')
<div class="header">
    <div class="header-top">
        <div class="container">
            <div class="mini-card pin">
                <span title="г. Белгород, Проспект Славы 150А">г. Белгород, Проспект Славы 150А</span>
            </div>
            <div class="mini-card float-r phone">
                <span title="8(952)436-50-64">8(952)436-50-64</span>
            </div>
            <div class="mini-card float-r pr-50 mail">
                <span title="CoderYooda@gmail.com">CoderYooda@gmail.com</span>
            </div>
        </div>
    </div>
    <div class="header-mid">
        <div class="container d-flex">
            <div class="logo-container header-elem">
                <div class="logo"></div>
                <h1 class="company-name">Название вашей компании</h1>
            </div>
            <div class="search-container header-elem">
                <div class="search-box">
                    <input placeholder="Пример поиска — 1744977" type="text">
                    <a href="javascript:void(0)" class="search-ico"></a>
                </div>
            </div>
            <div class="user-action-container header-elem">
                <div class="action">
                    <div class="icon heart"></div>
                    <div class="counter">1</div>
                </div>
                <div class="action">
                    <div class="icon cart"></div>
                    <div class="counter">242</div>
                </div>
                <div class="action">
                    <div class="icon user"></div>
                    <div class="baloon">СИ</div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="main-menu">
                <a href="javasctipt:void(0)" title="Меню тайтл" class="menu-item catalogue">Каталог продукции</a>
                <a href="javasctipt:void(0)" title="Меню тайтл" class="menu-item">о компании</a>
                <a href="javasctipt:void(0)" title="Меню тайтл" class="menu-item">оплата и доставка</a>
                <a href="javasctipt:void(0)" title="Меню тайтл" class="menu-item">гарантия и возврат</a>
                <a href="javasctipt:void(0)" title="Меню тайтл" class="menu-item">контакты</a>
            </div>
        </div>
    </div>
</div>
<div class="body">
    <div class="slider container">
        <div class="silder-content">
            <img style="display: block;" src="/images/shop/slider.png" alt=""> {{-- Это дерьмо меняем на слайдер --}}
            <div class="controls">
                <div class="control-item left"></div>
                <div class="control-item right"></div>
            </div>
            <div class="pins-container">
                <div class="pin"></div>
                <div class="pin"></div>
                <div class="pin active"></div>
                <div class="pin"></div>
                <div class="pin"></div>
            </div>
        </div>
    </div>
    <div class="popular container">
        <div class="title">
            <h2>Популярные товары</h2>
            <div class="products grid-4">
                @for($i = 0; $i <= 3; $i++)
                <div class="product">
                    <img class="product-img" title="сюда имя товара" src="/images/shop/product-{{ rand(0,3) }}.png" alt="">
                    <h3 class="product-name" title="Название товара!!!">Моторное масло</h3>
                    <div class="brand">VAG</div>
                    <div class="article">k1279</div>
                    <div class="price-container">
                        <span class="price">{{ number_format(rand(1000, 900000), 0, ',', ' ') }}</span>
                        <span class="strikethrough-price">{{ number_format(rand(1000, 900000), 0, ',', ' ') }}</span>
                    </div>
                    <div class="shipping-container">
                        <div class="counter-container">
                            <div class="button minus"></div>
                            <input class="counter" value="1" type="number">
                            <div class="button plus"></div>
                        </div>
                        <div class="cart-button"></div>
                    </div>
                </div>
                @endfor
            </div>
        </div>
    </div>
    <div class="catalogue container">
        <div class="title">
            <h2>Каталог товаров</h2>
        </div>
    </div>
    <div class="callback container">

    </div>
</div>
<div class="footer">

</div>
@endsection
