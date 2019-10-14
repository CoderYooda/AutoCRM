<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>{{ config('APP_NAME') }}</title>
    <meta name="description" content="Responsive, Bootstrap, BS4" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimal-ui" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- for ios 7 style, multi-resolution icon of 152x152 -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-barstyle" content="black-translucent">
    <link rel="apple-touch-icon" href="../assets/images/logo.svg">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/template.css') }}" rel="stylesheet">
</head>
<body>
<div class="row no-gutters">
    <div class="col-md-6 h-v white d-flex">
        <div class="p-5 flex align-self-center">
            <h1 class="display-4 _700 l-s-n-1x my-5">BB<span class="text-primary">crm</span> <br><span class="text-muted"> магазин автозапчастей</span></h1>
            <h5 class="text-muted mb-5 text-serif">Какой нибудь позитивный текст</h5>
            {{--<a href="#demos" data-scroll-to="demos" class="btn btn-lg btn-outline b-primary text-primary b-2x">See the demos</a>--}}
        </div>
    </div>
    <div class="col-md-6 d-flex py-5 align-items-center justify-content-center progress-bar-animated progress-bar-striped" style="background-color: #eff2f5">
        @yield('content')
    </div>
</div>


<div class="d-flex flex-column flex">
    <div class="navbar light bg pos-rlt box-shadow">
        <div class="mx-auto">
            <!-- brand -->
            <a href="/" class="navbar-brand">
                <span class="hidden-folded d-inline">{{ config('app.name', 'Laravel') }}</span>
            </a>
            <!-- / brand -->
        </div>
    </div>
    <div id="content-body">
        @yield('content')
    </div>
</div>
</body>
</html>
