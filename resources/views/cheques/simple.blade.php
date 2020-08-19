<html>

<head>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <link href="{{ mix('css/base.css') }}" rel="stylesheet">
    <link href="{{ mix('css/fonts.css') }}" rel="stylesheet">
</head>

{{--<body>--}}

{{--    <div class="box-lister" style="margin: 0 auto;">--}}
{{--        <div class="page_to_print">--}}
            <div>
                @foreach($products as $product)
                    @for($i = $product->count - 1; $i != -1; $i--)
{{--                    @foreach(\App\Models\Article::limit(17)->get() as $product)--}}
{{--                        @for($i = 0; $i != -1; $i--)--}}

                        <div style="width: 25%; height: calc(100vh / 4); float: left; display: inline-block" >

                            <div class="w-100 text-center border-left border-right white">

                                <div class="w-100 h-32-text border-top border-bottom">{{ auth()->user()->company->official_name }}</div>

                                <p class="p-5"><b>{{ $product->name }}</b></p>

                                <div class="border-top"><b>{{ $product->price }} руб.</b></div>

                                <div class="d-flex border-top border-bottom">
                                    <div class="flex-1 border-right p-5">{{ \Carbon\Carbon::now()->format('d.m.Y') }}</div>
                                    <div class="flex-1 all-center">шт</div>
                                </div>

                                <div class="h-32-text border-bottom no-wrap text-ov-hidden">Подпись __________</div>

                            </div>

                        </div>


                    @endfor
                @endforeach
            </div>


</html>
