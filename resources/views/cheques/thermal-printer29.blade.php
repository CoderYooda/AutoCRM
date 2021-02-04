<html>

<head>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <link href="{{ mix('css/base.css') }}" rel="stylesheet">
    <link href="{{ mix('css/fonts.css') }}" rel="stylesheet">
</head>

    @foreach($products as $product)
        @for($i = $product->count - 1; $i != -1; $i--)
{{--    @foreach(\App\Models\Product::where('barcode', '!=', null)->get() as $product)--}}
{{--        @for($i = 0; $i != -1; $i--)--}}

        <div class="border d-flex flex-column" style="width: 100%; height: 100%;">

            <div class="d-flex flex-column">

                @if($product->barcode)
                    <div class="flex-1">
                        <img style="padding: 2%;width: 100%;display: block;" src="data:image/png;base64,{!! getBarCodePNG($product->barcode) !!}" alt="barcode"   />
                    </div>
                @endif

            </div>

            <div style="padding: 10%; flex: auto; font-size: 300%;" class="font-weight-bolder all-center">
                <div>{{ $product->name }}</div>
            </div>

            <div style="padding: 2%; font-size: 250%;" class="border-bottom border-top d-flex flex-column pl-5">
                <div>Артикул: <b>{{ $product->article }}</b></div>
            </div>

            <div style="padding: 2%; font-size: 250%;" class="border-bottom d-flex flex-column pl-5">
                <div>Производитель: <b>{{ $product->supplier->name }}</b></div>
            </div>

            <div style="font-size: 8em; line-height: 2em;" class="pl-5  text-center">
                <b>{{ $product->price ?? '0.0 Р' }}</b>
            </div>

        </div>

        @endfor
    @endforeach

<script>

    document.addEventListener('DOMContentLoaded', function(){
        window.print();
    });

</script>

</html>
