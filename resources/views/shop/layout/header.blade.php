<div class="header">
    <div class="header-top">
        <div class="container">
            <div class="mini-card pin">
                <a href="{{ route('pages.about') }}" title="{{ $shop->name() }}">{{ $shop->name() }}</a>
            </div>
            @isset($shop->phone->number)
                <div class="mini-card float-r phone">
                    <a href="tel: +{{ $shop->phone->number }}">{{ display_phone($shop->phone->number) }}</a>
                </div>
            @endisset
            @if($shop->contactEmail->count())
                <div class="mini-card float-r pr-50 mail">
                    <a href="mailto:{{ $shop->contactEmail->first()->email }}" >{{ $shop->contactEmail->first()->email }}</a>
                </div>
            @endif
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

                    <a href="{{ route('user.index') }}" @if(!auth()->check()) onclick="auth.form();" @endif>
                        <div class="icon user">
                        </div>
                    </a>

                    @if(auth()->check())
                        <div class="dropdown">
                            <div class="name">{{ auth()->user()->companyPartner->fio }}</div>
                            <ul>
                                <li>
                                    <a href="{{ route('user.index') . '#garage' }}">Гараж</a>
                                </li>
                                <li>
                                    <a href="{{ route('user.index') . '#orders' }}">Мои заказы</a>
                                </li>
                                <li>
                                    <a href="{{ route('user.index') . '#settings' }}">Личные данные</a>
                                </li>
                            </ul>
                            <div class="quit">
                                <a class="dropdown-item" href="{{ route('user.logout') }}">
                                    Выход
                                </a>
                            </div>
                        </div>
                        <div class="baloon">{{ auth()->user()->companyPartner->nameLetters() }}</div>
                    @endif
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
