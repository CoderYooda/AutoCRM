<html>

<head>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <link href="{{ mix('css/base.css') }}" rel="stylesheet">
    <link href="{{ mix('css/fonts.css') }}" rel="stylesheet">
</head>

<div>
    @foreach($products as $product)
        @for($i = $product->count - 1; $i != -1; $i--)

            <div style="width: 25%; position:relative; height: calc(100vh / 4); float: left; display: inline-block;" >

                <div class="w-100 h-100 text-center">

                    <div class="border-left h-100 border-right white">
                        <div class="w-100 all-center border-top border-bottom ov-hidden" style="height: 46px;">
                            <span>{{ auth()->user()->company->official_name }}</span>
                        </div>

                        <div style="height: calc(100% - 135px);"><b>{{ $product->name }}</b></div>

                        <div class="border-top"><b>{{ $product->price }} руб.</b></div>

                        <div class="d-flex border-top border-bottom">
                            <div class="flex-1 border-right p-5">{{ \Carbon\Carbon::now()->format('d.m.Y') }}</div>
                            <div class="flex-1 all-center">шт</div>
                        </div>

                        <div class="h-32-text border-bottom no-wrap text-ov-hidden">Подпись __________</div>
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
