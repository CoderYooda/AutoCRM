<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Scripts -->
    <script src="{{ mix('js/app.js') }}" defer></script>

    <!-- Styles -->
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <link href="{{ mix('css/base.css') }}" rel="stylesheet">
    <link href="{{ mix('css/auth.css') }}" rel="stylesheet">
</head>
    <body>

        <div class="app auth-main">
            <div id="particles-js" class="left-side">
                <div class="bb-text-auth">
                    <h1 class="">Помогаем <br>бизнесу работать</h1>
                    <h5 class="">Эффективное решение <br>для ведения дела</h5>
                </div>
                <a href="https://bbcrm.ru/" class="back-site" target="_blank">
                    <img src="{{ asset('images/icons/arrow-left.svg') }}" alt="icon">
                    Вернуться на сайт
                </a>
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
        <script src="{{ asset('dependencies/particles/particles.js') }}" defer></script>
        <script src="{{ asset('dependencies/particles/app.js') }}" defer></script>

        <!— Yandex.Metrika counter —>
        <script type="text/javascript" >
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(64758580, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
            });
        </script>
        <noscript><div><img src="https://mc.yandex.ru/watch/64758580" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
        <!— /Yandex.Metrika counter —>
    </body>
</html>
