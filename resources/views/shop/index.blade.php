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
                <a href="javasctipt:void(0)" title="Каталог продукции" class="menu-item catalogue">Каталог продукции</a>
                <a href="javasctipt:void(0)" title="Каталог продукции" class="menu-item">о компании</a>
                <a href="javasctipt:void(0)" title="Каталог продукции" class="menu-item">оплата и доставка</a>
                <a href="javasctipt:void(0)" title="Каталог продукции" class="menu-item">гарантия и возврат</a>
                <a href="javasctipt:void(0)" title="Каталог продукции" class="menu-item">контакты</a>
            </div>
        </div>
    </div>
</div>
<div class="body">
    <div class="slider container">
        <div class="silder-content">
            <div class="head-slider-container">
                <img style="display: block;" src="/images/shop/slider.png" alt="">
                <img style="display: block;" src="/images/shop/slider.png" alt="">
                <img style="display: block;" src="/images/shop/slider.png" alt="">
                <img style="display: block;" src="/images/shop/slider.png" alt="">
            </div>
            <div class="controls">
                <div class="control-item left" onclick="window.headSlider.prev()"></div>
                <div class="control-item right" onclick="window.headSlider.next()"></div>
            </div>
            <div class="pins-container">
{{--                <div class="pin"></div>--}}
{{--                <div class="pin"></div>--}}
{{--                <div class="pin active"></div>--}}
{{--                <div class="pin"></div>--}}
{{--                <div class="pin"></div>--}}
            </div>
        </div>
    </div>
    <div class="popular container">
        <div class="title">
            <h2>Популярные товары</h2>
            <div class="products grid-4">
                <div class="popular-products">
                    @for($i = 0; $i < 5; $i++)
                    <div class="product">
                        <img class="product-img" title="сюда имя товара" src="/images/shop/product-{{ rand(0,3) }}.png" alt="">
                        <h3 class="product-name" title="Название товара!!!">Моторное масло</h3>
                        <div class="brand">VAG</div>
                        <div class="article">k1279</div>
                        <div class="price-container">
                            @php $isAction = rand(0,1); $price = rand(1000, 300000) @endphp
                            <span class="price @if($isAction) action @endif">{{ number_format($price, 0, ',', ' ') }}</span>
                            @if($isAction)
                            <span class="strikethrough-price">{{ number_format($price + rand(1000, 900000), 0, ',', ' ') }}</span>
                            @endif
                        </div>
                        <div class="top-left-label">
                            @if(rand(0,1))
                                <div class="in-stock">В наличии</div>
                            @else
                                <div class="out-of-stock">Под заказ</div>
                            @endif
                            @if($isAction)
                            <div class="discount">-30%</div>
                            @endif
                        </div>
                        <div class="top-right-label">
                            <div class="favour"></div>
                            <div class="info"></div>
                        </div>
                        <div class="shipping-container">
                            <div class="counter-container">
                                <div class="button minus"></div>
                                <input class="counter" value="1" type="text">
                                <div class="button plus"></div>
                            </div>
                            <div class="cart-button {{ rand(0,1) ? 'incart' : '' }}"></div>
                        </div>
                    </div>
                    @endfor
                </div>
                <div class="controls">
                    <div class="control-item left" onclick="window.popularSlider.prev()"></div>
                    <div class="control-item right" onclick="window.popularSlider.next()"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="catalogues container">
        <div class="title">
            <h2>Каталог товаров</h2>
        </div>
        <div class="categories-container">
            @for($i = 0; $i <= 10; $i++)
            <div class="category">
                <div class="description">
                    <div class="title">Название категории</div>
                    <div class="link">
                        <a title="Название категории сюда" href="javascript:void(0)">Перейти</a>
                    </div>
                </div>
                <div class="photo">
                    @if(rand(0,3))
                    <img title="Название категории сюда" src="/images/shop/category-{{ rand(1,2) }}.png" alt="">
                    @endif
                </div>
            </div>
            @endfor
        </div>
    </div>
</div>
<div class="callback">
    <div class="container">
        <div class="info callback-elem">
            <div class="fast-mail"></div>
            <div class="description">
                <span class="fat">ЗАКАЗАТЬ ОБРАТНЫЙ ЗВОНОК</span>
                <span class="">Остались вопросы? Свяжитесь с нами!</span>
            </div>
        </div>
        <div class="feedaback">
            <div class="name-container">
                <input placeholder="Имя" class="name" type="text">
            </div>
            <div class="phone-container">
                <input placeholder="Телефон" class="phone" type="text">
            </div>
            <button>Заказать звонок</button>
        </div>
    </div>

</div>
<div class="botton-info">
    <div class="container">
        <div class="contacts">
            <div class="mini-card pin">
                <span title="г. Белгород, Проспект Славы 150А">г. Белгород, Проспект Славы 150А</span>
            </div>
            <div class="mini-card phone">
                <span title="8(952)436-50-64">8(952)436-50-64</span>
            </div>
            <div class="mini-card  mail">
                <span title="CoderYooda@gmail.com">CoderYooda@gmail.com</span>
            </div>
        </div>
        <div class="menu">
            <a title="О компании" href="javascript:void(0)">О компании</a>
            <a title="Оплата и доставка" href="javascript:void(0)">Оплата и доставка</a>
            <a title="Гарантия и возврат" href="javascript:void(0)">Гарантия и возврат</a>
            <a title="Контакты" href="javascript:void(0)">Контакты</a>
        </div>
    </div>
</div>
<div class="footer">
    <div class="container">
        <div class="logo-container footer-elem">
            <div class="logo"></div>
            <span class="company-name">Название вашей компании</span>
        </div>
        <div class="footer-elem"></div>
        <div class="copyright-data footer-elem">
            <span>
                © «Название компании» 2020, работает на <a title="Лучшая программа для автозапчастей" href="https://bbcrm.ru/">#bbcrm</a>
            </span>
        </div>
        <div class="personal-data footer-elem">
            <a title="Обработка персональных данных" href="javascript:void(0)">Обработка персональных данных</a>
        </div>
    </div>
</div>
@endsection
