<div class="tab_name">
    Мои заказы
</div>

<div class="orders_header">

    <div class="title" style="max-width: 60px;">№</div>
    <div class="title">Статус</div>
    <div class="title">Дата</div>
    <div class="title">Сумма</div>
    <div class="title" style="max-width: 75px;">Скидка</div>
    <div class="title">Итого</div>

</div>

<div class="orders_body">

    @foreach($orders as $order)

        <div class="order_element">

            <div class="order_info">
                <div class="desc" style="max-width: 60px;">{{ $order->id }}</div>
                <div class="desc">{{ $order->getStatusName() }}</div>
                <div class="desc">{{ $order->created_at }}</div>
                <div class="desc">{{ correct_price($order->total_price) }} ₽</div>
                <div class="desc" style="max-width: 75px;">0%</div>
                <div class="desc">{{ correct_price($order->total_price) }}  ₽</div>

                <div class="toggle" onclick="user.showOrderPositions(this);">
                    <i class="fa fa-chevron-down" aria-hidden="true"></i>
                </div>
            </div>

            <div class="order_positions">

                <div class="header">
                    <div class="title">№</div>
                    <div class="title">Наименование</div>
                    <div class="title">Артикул</div>
                    <div class="title">Бренд</div>
                    <div class="title">Магазин</div>
                    <div class="title count">Кол-во</div>
                    <div class="title">Цена</div>
                    <div class="title">Всего</div>
                </div>

                <div class="body">

                    @foreach($order->positions as $position)

                        <div class="element">

                            <div class="desc">{{ $loop->index }}</div>
                            <div class="desc">{{ $position->name }}</div>
                            <div class="desc">{{ $position->article }}</div>
                            <div class="desc">{{ $position->manufacturer }}</div>
                            <div class="desc">Археерейская</div>
                            <div class="desc count">{{ $position->count }}</div>
                            <div class="desc">{{ correct_price($position->price) }} ₽</div>
                            <div class="desc">{{ correct_price($position->price * $position->count) }} ₽</div>

                        </div>

                    @endforeach

                </div>

                <div class="buttons">

                    <div class="button">Распечатать</div>

                    @if($order->status == 1)
                        <div class="button">Оплатить</div>
                    @endif

                </div>

            </div>

        </div>

    @endforeach

</div>
