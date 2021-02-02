<html>

<head>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <link href="{{ mix('css/base.css') }}" rel="stylesheet">
    <link href="{{ mix('css/fonts.css') }}" rel="stylesheet">
</head>

<div>
    @foreach($products as $product)
        @for($i = $product->count - 1; $i != -1; $i--)
{{--                    @foreach(\App\Models\Product::where('barcode', '=', null)->get() as $product)--}}
{{--                        @for($i = 0; $i != -1; $i--)--}}

            <div style="width: 25%; position:relative; height: calc(100vh / 4); float: left; display: inline-block;" >

                <div class="border-top border-left border-right">

                    <div class="d-flex flex-column">

                        @if($product->barcode)
                            <div class="flex-1">
                                <img style="height: 45px;padding: 9px 9px 0; width: 100%;" src="data:image/png;base64,{!! getBarCodePNG($product->barcode) !!}" alt="barcode"   />
                            </div>
                        @endif

                        <div class="flex-1 pl-5">
                            <div>{{ auth()->user()->company->official_name }}</div>
                            <div>{{ \Carbon\Carbon::now()->format('d.m.Y') }}</div>
                        </div>

                    </div>

                    <div class="font-weight-bolder all-center" style="height: @if($product->barcode) calc(100% - 167px); @else calc(100% - 100px);  @endif">
                        <b>{{ $product->name }}</b>
                    </div>

                    <div class="border-bottom d-flex flex-column pl-5">
                        <div>Артикул: {{ $product->article }}</div>
                    </div>

                    <div class="border-bottom d-flex flex-column pl-5">
                        <div>Производитель: {{ $product->supplier->name }}</div>
                        <div>Цена за 1 шт</div>
                    </div>

                    <div class="text-center border-bottom" style="font-size: 20px;">
                        <b>{{ $product->price ?? '0 Р' }}</b>
                    </div>

                </div>

            </div>


        @endfor
    @endforeach
</div>

<script>

    document.addEventListener('DOMContentLoaded', function(){
        window.print();
    });

</script>

</html>
