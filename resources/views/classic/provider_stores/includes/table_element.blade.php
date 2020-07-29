@foreach($stores as $store)
    <tr>
        <td><img src="{{ asset('/images/table/line.svg') }}" /></td>
        <td>{{ $store['name'] }}</td>
        <td>{{ $store['code'] }}</td>
        <td>{{ $store['delivery'] }} дн.</td>
        <td>{{ $store['price'] }}</td>
    </tr>
@endforeach
