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

            <div style="width: 25%; position:relative; height: 25%; float: left; display: inline-block;" >

                <div class="border-top border-left border-right">

                    <div class="d-flex flex-column" style="width: auto; position:relative; height: 25%;">

                        @if($product->barcode && $product->barcode != null)
                            <div class="flex-1 p-5" style="width: auto; position:relative;">
                                <img class="p-5" style="width: auto; height: auto; max-width: 100%; margin: auto; display: block" src="data:image/png;base64,{!! getBarcodePNG($product->barcode) !!}" alt="barcode"   />
                            </div>
                        @endif

                        <div class="d-flex border-top border-bottom" style="width: auto; position:relative; height: auto">
                            <div class="flex-1 p-5">
                                {{ auth()->user()->company->official_name }}<br>
                                {{ \Carbon\Carbon::now()->format('d.m.Y') }}
                            </div>
                        </div>
                    </div>

                    <div class="text-center border-bottom all-center" style="width: auto; font-size: 25px; position:relative; height: 20%;">
                        <b>{{ $product->price ?? '0 Р' }}</b>
                    </div>

                    <div class="font-weight-bolder all-center" style="height: 35%; ">
                        <b>{{ $product->name }}</b>
                    </div>

                    <div class="border-bottom border-top d-flex flex-column pl-5" style="width: auto; position:relative; height: 10%;">
                        <div>Артикул: <b>{{ $product->article }}</b></div>
                    </div>

                    <div class="border-bottom d-flex flex-column pl-5" style="width: auto; position:relative; height: 10%;">
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
