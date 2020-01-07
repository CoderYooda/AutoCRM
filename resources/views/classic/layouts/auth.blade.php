<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
    <body>

    <div class="app auth-main">
        <div class="left-side">
            <div class="bb-text-auth">
                <h1 class="">BB<span class="text-primary">CRM</span> <br><span class="text-muted"> магазин автозапчастей</span></h1>
                <h5 class="">
                    Коль не кончился бензин, заезжай к нам в магазин!
                    Подберём тебе тюнячки. Чудо будет, а не тачка!
                </h5>
            </div>
        </div>

        <div class="right-side">
            @yield('content')
        </div>
    </div>



    {{--<div class="d-flex flex-column flex">--}}
        {{--<div class="navbar light bg pos-rlt box-shadow">--}}
            {{--<div class="mx-auto">--}}
                {{--<!-- brand -->--}}
                {{--<a href="/" class="navbar-brand">--}}
                    {{--<span class="hidden-folded d-inline">{{ config('app.name', 'Laravel') }}</span>--}}
                {{--</a>--}}
                {{--<!-- / brand -->--}}
            {{--</div>--}}
        {{--</div>--}}
        {{--<div id="content-body">--}}
            {{--@yield('content')--}}
        {{--</div>--}}
    {{--</div>--}}
        <script src="{{ asset('js/app.js') }}" defer></script>
    </body>
</html>
