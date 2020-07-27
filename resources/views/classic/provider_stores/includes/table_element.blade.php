@foreach($stores as $store)
    <tr>
        <td>{{ $store['stock'] }}</td>
        <td>{{ $store['code'] }}</td>
        <td>{{ $store['deliverydays'] }} дн.</td>
        <td>{{ $store['price'] }}</td>
    </tr>
@endforeach
