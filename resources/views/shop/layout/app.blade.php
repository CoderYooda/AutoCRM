<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Интернет магазин</title>

    <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Scripts -->
    <script src="{{ asset('js/shop.js') }}" defer></script>
    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=c2977ace-5964-4b2c-aa49-c50ad494239f" type="text/javascript"></script>

    <!-- Styles -->
    <link href="{{ asset('css/shop.css') }}" rel="stylesheet">

    <link href="/images/shop/header_bg.png" rel="headImage">
    <link href="/images/shop/body_bg.png" rel="bodyImage">
</head>
    <body>
    @include('shop/layout/header')
    @yield('content')
    @include('shop/layout/footer')
    </body>
</html>
