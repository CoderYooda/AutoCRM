<html>

<head>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <link href="{{ mix('css/base.css') }}" rel="stylesheet">
    <link href="{{ mix('css/fonts.css') }}" rel="stylesheet">
</head>

<div>
    @foreach($products as $product)
        @for($i = $product->count - 1; $i != -1; $i--)

            <div style="width: 25%; position:relative; height: 25%; float: left; display: inline-block;" >

                <div class="w-100 h-100 text-center">

                    <div class="border-left h-100 border-right white">
                        <div class="w-100 all-center border-top border-bottom ov-hidden" style="height: 20%; position: relative;">
                            <span>{{ auth()->user()->company->official_name }}</span>
                        </div>

                        <div class="all-center" style="height: 35%; max-width: 100%; position: relative;"><b>{{ $product->name }}</b></div>

                        <div class="border-top" style="height: 15%; position: relative;">
                            Артикул:  <b> {{ $product->article }} </b><br>
                            Производитель: <b> {{ $product->supplier->name  }} </b>
                        </div>
                        <div class="border-top" style="height: 10%; position: relative;"><b>{{ $product->price ?? '0.0 Р' }} руб.</b></div>

                        <div class="d-flex border-top border-bottom" style="height: 10%; position: relative;">
                            <div class="flex-1 border-right p-5">{{ \Carbon\Carbon::now()->format('d.m.Y') }}</div>
                            <div class="flex-1 all-center">шт</div>
                        </div>

                        <div class="h-32-text border-bottom no-wrap text-ov-hidden" style="height: 10%; position: relative;">Подпись __________</div>
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
