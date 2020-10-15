<div class="header">
    <div class="header-top">
        <div class="container">
            <div class="mini-card pin">
                <a href="{{ route('pages.about') }}" title="{{ $shop->address_name }}">{{ $shop->address_name }}</a>
            </div>
            <div class="mini-card float-r phone">
                <a href="tel: +{{ $shop->phone->number }}">{{ display_phone($shop->phone->number) }}</a>
            </div>
            <div class="mini-card float-r pr-50 mail">
                <a href="mailto:{{ $shop->contactEmail->first()->email }}" >{{ $shop->contactEmail->first()->email }}</a>
            </div>
        </div>
    </div>
    <div class="header-mid">
        <div class="container bg-white d-flex">
            <div class="logo-container header-elem d-flex" style="align-items: center;">
                <div>
                    <a href="{{ route('pages.index') }}">
                        <div class="logo">
                            @isset($shop->logotypeImage)
                                <img class="w-100 h-100" src="{{ $shop->logotypeImage->path() }}" title="{{ $shop->name }}"  alt="{{ $shop->name }}"/>
                            @endisset
                        </div>
                    </a>
                </div>
                <div class="ml-15">
                    <h1 class="company-name">
                        <a href="{{ route('pages.index') }}">{{ $shop->name }}</a>
                    </h1>
                </div>
            </div>
            <div class="search-container header-elem">
                <form action="{{ route('pages.search') }}" method="GET">
                    <div class="search-box">
                        <input placeholder="Пример поиска — k1279" name="search" type="text" value="{{ request()->search }}" required />
                        <button class="search-ico"></button>
                    </div>
                </form>
            </div>
            <div class="user-action-container header-elem">
                <div class="action">
                    <a href="{{ route('favorites.index') }}">
                        <div class="icon heart"></div>
                    </a>
                    <div id="favorite_count" class="counter">{{ $favorite->count() }}</div>
                </div>
                <div class="action">
                    <a href="{{ route('cart.index') }}">
                        <div class="icon cart"></div>
                    </a>
                    <div id="cart_count" class="counter">{{ $cart->total() }}</div>
                </div>
                <div class="action" >
                    <div onclick="window.auth()" class="icon user"></div>
                    <div class="dropdown">
                        <div class="name">Имя Фамилия</div>
                        <ul>
                            <li>
                                <a href="javascript:void(0)">Гараж</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">Мои заказы</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">Личные данные</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">Настройки</a>
                            </li>
                        </ul>
                        <div class="quit">
                            <a href="javascript:void(0)">Выход</a>
                        </div>
                    </div>
                    <div class="baloon">СИ</div>
                </div>
            </div>
        </div>
        <div class="container bg-white">
            <div class="main-menu">
                <a href="{{ route('pages.catalogue') }}" title="Каталог продукции" class="menu-item catalogue">Каталог продукции</a>
                <a href="{{ route('pages.about') }}" title="Каталог продукции" class="menu-item">о компании</a>
                <a href="{{ route('pages.delivery') }}" title="Каталог продукции" class="menu-item">оплата и доставка</a>
                <a href="{{ route('pages.warranty') }}" title="Каталог продукции" class="menu-item">гарантия и возврат</a>
                <a href="{{ route('pages.contacts') }}" title="Каталог продукции" class="menu-item">контакты</a>
            </div>
        </div>
    </div>
</div>
