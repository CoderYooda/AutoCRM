<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Signup | Apply - Bootstrap 4 Web Application</title>
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