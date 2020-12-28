<h1>Заказ №{{ $order->id }}</h1>
<h3>Список позиций:</h3>
<table border="1" style="width:100%">
    <thead>
    <tr>
        <td>Позиция</td>
        <td>Наименование</td>
        <td>Производитель</td>
        <td>Артикул</td>
        <td>Стоимость</td>
        <td>Кол-во</td>
        <td>Источник</td>
    </tr>
    </thead>
    <tbody>
        @foreach($order->positions as $position)
            <tr>
                <td>{{ $loop->index + 1 }}.</td>
                <td>{{ $position->name }}</td>
                <td>{{ $position->manufacturer }}</td>
                <td>{{ $position->article }}</td>
                <td>{{ correct_price($position->price) }} руб.</td>
                <td>{{ $position->count }} шт.</td>
                <td>{{ $position->source }}</td>
            </tr>
        @endforeach
    </tbody>
</table>
<p>Общая стоимость позиций: {{ correct_price($totalPrice) }} руб.</p>
