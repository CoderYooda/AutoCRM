@foreach($stores as $store)
    <tr>
        <td><div class="tree_image"></div></td>
        <td><span>{{ $store['name'] }}</span></td>
        <td><span>{{ $store['code'] }}</span></td>
        <td><span>{{ $store['delivery'] }} дн.</span></td>
        <td><span>{{ $store['price'] }}</span></td>
    </tr>
@endforeach
