<html>

<head>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <link href="{{ mix('css/base.css') }}" rel="stylesheet">
    <link href="{{ mix('css/fonts.css') }}" rel="stylesheet">
</head>

<div>
    @foreach($products as $product)
        @for($i = $product->count - 1; $i != -1; $i--)
{{--                    @foreach(\App\Models\Product::where('barcode', '!=', null)->get() as $product)--}}
{{--                        @for($i = 0; $i != -1; $i--)--}}

            <div style="width: 25%; position:relative; height: calc(100vh / 5); float: left; display: block;" >

                <div class="border-top border-left border-right border-bottom">

                    <div class="d-flex flex-column">

                        @if($product->barcode)
                            <div class="flex-1">
                                <img style="height: 45px;padding: 9px; width: 100%;" src="data:image/png;base64,{!! getBarCodePNG($product->barcode) !!}" alt="barcode"   />
                            </div>
                        @endif

                        <div style="font-size: 20px;" class="flex-1 pl-5 border-top border-bottom text-center">
                            <b>{{ $product->price ?? '0.0 Р'}} руб. </b>
                        </div>

                    </div>

                    <div class="border-bottom font-weight-bolder all-center" style="height: @if($product->barcode) calc(100% - 125px); @else calc(100% - 80px);  @endif">
                        <b>{{ $product->name }}</b>
                    </div>

                    <div class="border-bottom d-flex flex-column pl-5">
                        <div>Артикул: <b>{{ $product->article }}</b></div>
                    </div>

                    <div class="border-bottom d-flex flex-column pl-5">
                        <div>Производитель: <b>{{ $product->supplier->name }}</b></div>
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
