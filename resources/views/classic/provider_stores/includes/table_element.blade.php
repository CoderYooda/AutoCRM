@foreach($stores as $store)
    <tr>
        <td>{{ $store['name'] }}</td>
        <td>{{ $store['code'] }}</td>
        <td>{{ $store['delivery'] }} дн.</td>
        <td>{{ $store['price'] }}</td>
    </tr>
@endforeach
