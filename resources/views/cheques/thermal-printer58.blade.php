<html>

<head>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <link href="{{ mix('css/base.css') }}" rel="stylesheet">
    <link href="{{ mix('css/fonts.css') }}" rel="stylesheet">
</head>

    @foreach($products as $product)
        @for($i = $product->count - 1; $i != -1; $i--)
{{--    @foreach(\App\Models\Article::where('barcode', '!=', null)->get() as $product)--}}
{{--        @for($i = 0; $i != -1; $i--)--}}

            <div class="border d-flex flex-column" style="width: 100%; height: 100%;">

                <div class="d-flex flex-column">

                    @if($product->barcode)
                        <div class="flex-1">
                            <img style="padding: 2%;width: 100%;display: block;" src="data:image/png;base64,{!! getBarCodePNG($product->barcode) !!}" alt="barcode"   />
                        </div>
                    @endif

                </div>

                <div style="padding: 10%; flex: auto; font-size: 400%;" class="font-weight-bolder all-center">
                    <div>{{ $product->name }}</div>
                </div>

                <div class="d-flex flex-column" style="font-size: 250%; padding-left: 2%;">
                    <div>Производитель: {{ $product->supplier->name }}</div>
                    <div>Цена за 1 шт</div>
                </div>

                <div style="font-size: 8em; line-height: 2em;" class="pl-5 border-top text-center">
                    <b>{{ $product->price ?? '1000.0 Р' }}</b>
                </div>

            </div>


        @endfor
    @endforeach

</html>
