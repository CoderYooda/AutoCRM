@foreach($manufacturers as $manufacturer)

    <tr id="brand_{{ $manufacturer }}">
        <td>{{ $loop->index + 1 }}</td>
        <td>{{ $manufacturer }}</td>
        <td>{{ $request->search }}</td>
        <td>
            <button type="button" onclick="store.showManufactureStores(this, '{{ $manufacturer }}')">OPEN</button>
        </td>
    </tr>

    <tr class="d-none" id="brand_context_{{ $manufacturer }}">
        <td colspan="4" data-simplebar style="max-height: 100px;">
            <table style="width: 60%; margin-left: 80px;">
                <thead>
                    <tr>
                        <td>Склад</td>
                        <td>Код</td>
                        <td>Срок поставки</td>
                        <td>Цена</td>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </td>
    </tr>

@endforeach
