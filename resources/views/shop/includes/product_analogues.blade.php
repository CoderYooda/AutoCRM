@foreach($providersOrders as $providerKey => $orders)

    @continue(count($orders['originals']) == 0 && count($orders['analogues']) == 0)

    <div class="table @if($loop->first) mt-0 @endif" data-service="{{ $providerKey }}">

        @if(count($orders['originals']))
            <div class="name mt-0">
                Склад {{ $loop->index + 1 }}
            </div>

            <div class="header">

                <div class="flex-1 manufacturer">
                    <span>Производитель</span>
                    {{--                            <i class="fa fa-caret-up ml-10" aria-hidden="true"></i>--}}
                </div>

                <div class="flex-1 article">
                    <span>Артикул</span>
                    {{--                            <i class="fa fa-caret-up ml-10" aria-hidden="true"></i>--}}
                </div>

                <div class="flex-1 availability pointer" onclick="product.sortBy(this, 'originals', 'rest');">
                    <span>В наличии</span>
                    <i class="fa fa-caret-up ml-10" aria-hidden="true"></i>
                </div>

                <div class="flex-1 price pointer" onclick="product.sortBy(this, 'originals', 'days_min');">
                    <span>Срок поставки</span>
                    <i class="fa fa-caret-up ml-10" aria-hidden="true"></i>
                </div>

                <div class="flex-2 shop pointer" onclick="product.sortBy(this, 'originals', 'price');">
                    <span>Цена</span>
                    <i class="fa fa-caret-up ml-10" aria-hidden="true"></i>
                </div>

                <div class="originals">Оригинальные</div>

            </div>

            @include('shop.includes.analogues_body', ['type' => 'originals'])

        @endif

        @if(count($orders['analogues']))
            <div class="header">

                <div class="flex-1 manufacturer">
                    <span>Производитель</span>
                    {{--                            <i class="fa fa-caret-up ml-10" aria-hidden="true"></i>--}}
                </div>

                <div class="flex-1 article">
                    <span>Артикул</span>
                    {{--                            <i class="fa fa-caret-up ml-10" aria-hidden="true"></i>--}}
                </div>

                <div class="flex-1 availability pointer" onclick="product.sortBy(this, 'analogues', 'rest');">
                    <span>В наличии</span>
                    <i class="fa fa-caret-up ml-10" aria-hidden="true"></i>
                </div>

                <div class="flex-1 price pointer" onclick="product.sortBy(this, 'analogues', 'days_min');">
                    <span>Срок поставки</span>
                    <i class="fa fa-caret-up ml-10" aria-hidden="true"></i>
                </div>

                <div class="flex-2 shop pointer" onclick="product.sortBy(this, 'analogues', 'price');">
                    <span>Цена</span>
                    <i class="fa fa-caret-up ml-10" aria-hidden="true"></i>
                </div>

                <div class="analogues">Аналоги</div>

            </div>

            @include('shop.includes.analogues_body', ['type' => 'analogues'])
        @endif

    </div>

@endforeach
