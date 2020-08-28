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
                        <img style="padding: 2%;width: 100%;display: block;" src="data:image/png;base64,{!! \App\Http\Controllers\BarcodeController::getBarCodePNG($product->barcode) !!}" alt="barcode"   />
                    </div>
                @endif

                <div style="font-size: 10em; line-height: 2em;" class="flex-1 pl-5 border-top border-bottom text-center">
                    <b>{{ $product->price ?? '1000.0 Р' }}</b>
                </div>

            </div>

            <div style="padding: 10%; flex: auto; font-size: 400%;" class="font-weight-bolder all-center">
                <div>{{ $product->name }}</div>
            </div>

        </div>

        @endfor
    @endforeach

</html>
