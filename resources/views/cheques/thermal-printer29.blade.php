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
                        <img class="p-10" style=" width: 100%; max-width: 100%; margin: auto; display: block" src="data:image/png;base64,{!! getBarcodePNG($product->barcode) !!}" alt="barcode"   />
                    </div>
                @endif
                <div class="d-flex border-top border-bottom">
                    <div style="font-size: 250%;" class="flex-1 border-right p-5">{{ auth()->user()->company->official_name }}</div>
                    <div style="font-size: 250%;" class="flex-1 all-center">{{ \Carbon\Carbon::now()->format('d.m.Y') }}</div>
                </div>

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
