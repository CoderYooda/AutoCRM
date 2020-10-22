@extends('shop.layout.app')

@section('content')

    <script>
        window.coordinates = [{{ $shop->address_coords }}];
    </script>

    <div class="body">

        @include('shop.includes.breadcrumbs')

        <div class="container bg-white order_page">

            <div class="title">
                <h2>Заказ №{{ $order->id }}</h2>
                <h3>{{ $statuses[$order->status] }}</h3>
            </div>

            <div class="orders_table">

                <div class="orders_header">
                    <div class="w-10">№</div>
                    <div class="w-20">Наименование</div>
                    <div class="w-15">Артикул</div>
                    <div class="w-15">Бренд</div>
                    <div class="w-10">Магазин</div>
                    <div class="w-10">Кол-во</div>
                    <div class="w-10">Цена</div>
                    <div class="w-10">Всего</div>
                </div>

                <div class="orders_body" data-simplebar style="max-height: 300px;">

                    @foreach($positions as $position)

                        <div class="order_element">

                            <div class="w-10">{{ $loop->index }}</div>
                            <div class="w-20">{{ $position->name }}</div>
                            <div class="w-15">{{ $position->article }}</div>
                            <div class="w-15">{{ $position->manufacturer }}</div>
                            <div class="w-10">{{ 'Заказная позиция' }}</div>
                            <div class="w-10">{{ $position->count }}</div>
                            <div class="w-10">{{ correct_price($position->price) }} ₽</div>
                            <div class="w-10">{{ correct_price($position->count * $position->price) }} ₽</div>

                        </div>

                    @endforeach

                </div>

            </div>

            <div class="d-flex">
                <div class="float-l">
                    <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
                    <span class="ml-16">Вернуться на главную</span>
                </div>
                <div class="float-r">
                    <div class="print_orders">

                    </div>
                </div>
            </div>

        </div>

    </div>

@endsection
