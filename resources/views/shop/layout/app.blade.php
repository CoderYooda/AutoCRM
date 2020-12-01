<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>@yield('title', 'Интернет магазин')</title>
    <meta name="description" content="@yield('description', '')">

    <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Styles -->
    <link href="{{ asset('css/shop.css') }}" rel="stylesheet">

    <!-- Scripts -->
    <script src="{{ asset('js/shop.js') }}?{{ getenv('VERSION') }}" defer></script>
    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=c2977ace-5964-4b2c-aa49-c50ad494239f" type="text/javascript"></script>

    @if($shop->yandex_verification)
        <meta name="yandex-verification" content="{{ $shop->yandex_verification }}" />
    @endif

    @if($shop->image_favicon_id)
        <link rel="shortcut icon" href="{{ $shop->faviconImage->path }}" type="image/png">
    @endif

    @if($shop->google_analytics)

        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id={{ $shop->google_analytics }}"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '{{ $shop->google_analytics }}');
        </script>

    @endif

    @isset($shop->headerImage)
        <link href="{{ $shop->headerImage->path }}" rel="headImage">
    @endisset

    @isset($shop->backgroundImage)
        <link href="{{ $shop->backgroundImage->path  }}" rel="bodyImage">
    @endisset

</head>
<body>

    @include('shop.layout.header')
    @yield('content')
    @include('shop.layout.footer')

</body>
</html>
