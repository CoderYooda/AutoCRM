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

    @foreach([1, 2, 3, 4, 5, 6, 7, 8] as $i)

        <div class="order_element">

            <div class="order_info">
                <div class="desc" style="max-width: 60px;">321</div>
                <div class="desc">Укомплектован</div>
                <div class="desc">16.09.2020 16:35</div>
                <div class="desc">6 000.00 ₽</div>
                <div class="desc" style="max-width: 75px;">50%</div>
                <div class="desc">3 000.00 ₽</div>

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

                    @foreach([1, 2, 3, 4, 5, 6, 7] as $x)

                        <div class="element">

                            <div class="desc">{{ $loop->index }}</div>
                            <div class="desc">Шаровая опора</div>
                            <div class="desc">67477646000</div>
                            <div class="desc">Toshiba</div>
                            <div class="desc">Археерейская</div>
                            <div class="desc count">10</div>
                            <div class="desc">600.00 ₽</div>
                            <div class="desc">6 000.00 ₽</div>

                        </div>

                    @endforeach

                </div>

                <div class="buttons">

                    <div class="button">Распечатать</div>
                    <div class="button">Оплатить</div>

                </div>

            </div>

        </div>

    @endforeach

</div>
