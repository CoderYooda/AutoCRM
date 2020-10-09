@extends('shop.layout.app')

@section('content')
<script>
    window.coordinates = [52.751574, 37.573856];
</script>
<div class="body">
    <div class="pagination container bg-white">
        <div class="paginator">
            <span class="item" ><a href="javascript:void(0)">Главная</a></span>
            <span class="item" ><a href="javascript:void(0)">После главной</a></span>
            <span class="item" >Последняя</span>
        </div>
    </div>
    <div class="contacts container bg-white">
        <div class="title">
            <h2>Контакты компании</h2>
        </div>
        <div class="contacts-container">
            <div class="info-block">
                <div class="store-name">
                    Гипермаркет какой то там
                </div>
                <div class="address">
                    г. Москва, Каширское шоссе, д. 53, к. 1 Вход с обратной стороны
                </div>
                <div class="mail-phone-container">
                    <div class="item">
                        <div class="key">Бухгалтерия</div>
                        <div class="value"><a href="#" >+7 (987) 654-32-10</a></div>
                    </div>
                    <div class="item">
                        <div class="key">Руководство</div>
                        <div class="value">
                            <a href="#" >+7 (987) 654-32-10</a>
                            <a href="#" >+7 (987) 654-32-10</a>
                            <a href="#" >+7 (987) 654-32-10</a>
                            <a href="#" >+7 (987) 654-32-10</a>
                        </div>
                    </div>
                    <div class="item">
                        <div class="key">Бухгалтерия</div>
                        <div class="value"><a href="#" >CoderYooda@gmail.com</a></div>
                    </div>
                    <div class="item">
                        <div class="key">Руководство</div>
                        <div class="value">
                            <a href="#" >CoderYooda@gmail.com</a>
                            <a href="#" >CoderYooda@gmail.com</a>
                            <a href="#" >CoderYooda@gmail.com</a>
                            <a href="#" >CoderYooda@gmail.com</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="map-holder">
                <div id="map" class="map"></div>
            </div>
        </div>
    </div>
</div>
@endsection
