@foreach($manufacturers as $manufacturer)

    <tr id="brand_{{ $manufacturer }}" style="height: 40px;">
        <td>{{ $loop->index + 1 }}</td>
        <td>{{ $manufacturer }}</td>
        <td>{{ $request->search }}</td>
        <td style="width: 38px;">
            <div class="store_arrow_bg pointer" onclick="store.showManufactureStores(this, '{{ $manufacturer }}')">
                <i class="fa fa-angle-down fa-5" aria-hidden="true"></i>
            </div>
        </td>
    </tr>

    <tr class="d-none unhovereable" id="brand_context_{{ $manufacturer }}">
        <td colspan="4" data-simplebar style="max-height: 100px;">
            <table class="w-100" cellspacing="0" cellpadding="0" border="0">
                <thead>
                    <tr>
                        <th></th>
                        <th>Склад</th>
                        <th>Код</th>
                        <th>Срок поставки</th>
                        <th>Цена</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </td>
    </tr>

@endforeach
