<html>

<head>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <link href="{{ mix('css/base.css') }}" rel="stylesheet">
    <link href="{{ mix('css/fonts.css') }}" rel="stylesheet">
</head>

<body>

    <div class="box-lister" style="max-width: 1000px; margin: 0 auto;">

        <div class="statistic-row">
            @foreach([1, 2, 3, 4, 5, 6] as $element)

                <div class="statistic-filter p-5">

                    <div class="box w-100 h-100 text-center border-left border-right">

                        <div class="w-100 h-32-text border-top border-bottom">{{ auth()->user()->company->official_name }}</div>

                        <p><b>Масло моторное SUPER 2000 X1 10W40 п/синт.1л</b></p>

                        <div class="border-top"><b>390.00 руб.</b></div>

                        <div class="d-flex border-top border-bottom">
                            <div class="flex-1 border-right">13.08.20</div>
                            <div class="flex-1">шт</div>
                        </div>

                        <div class="h-32-text border-bottom">Подпись ________________</div>

                    </div>

                </div>

            @endforeach
        </div>

    </div>

</body>

</html>
