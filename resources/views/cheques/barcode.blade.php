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

            <div style="width: 25%; position:relative; height: calc(100vh / 3); float: left; display: inline-block;" >

                <div class="border-top border-left border-right">

                    <div class="d-flex flex-column">

                        @if($product->barcode)
                            <div class="flex-1">
                                <img class="p-5" style=" width: auto; max-width: 100%; margin: auto; display: block" src="data:image/png;base64,{!! getBarcodePNG($product->barcode) !!}" alt="barcode"   />
                            </div>
                        @endif

                            <div class="d-flex border-top border-bottom">
                                <div class="flex-1 border-right p-5">{{ auth()->user()->company->official_name }}</div>
                                <div class="flex-1 all-center">{{ \Carbon\Carbon::now()->format('d.m.Y') }}</div>
                            </div>


                    </div>

                    <div class="font-weight-bolder all-center" style="height: @if($product->barcode) calc(100% - 167px); @else calc(100% - 124px);  @endif">
                        <b>{{ $product->name }}</b>
                    </div>

                    <div class="border-bottom border-top d-flex flex-column pl-5">
                        <div>Артикул: <b>{{ $product->article }}</b></div>
                    </div>

                    <div class="border-bottom d-flex flex-column pl-5">
                        <div>Производитель: <b>{{ $product->supplier->name }}</b></div>
                    </div>

                    <div class="text-center border-bottom" style="font-size: 25px;">
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
