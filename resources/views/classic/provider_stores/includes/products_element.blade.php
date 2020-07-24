@foreach($manufacturers as $manufacturer)
    <tr>
        <td>{{ $loop->index + 1 }}</td>
        <td>{{ $manufacturer }}</td>
        <td>{{ $request->search }}</td>
        <td>
            <button type="button" onclick="store.showManufactureStores(this, '{{ $manufacturer }}')">OPEN</button>
        </td>
    </tr>
@endforeach
