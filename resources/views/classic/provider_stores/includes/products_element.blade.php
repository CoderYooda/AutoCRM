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

    <tr class="unhovereable d-none" id="brand_context_{{ $manufacturer }}">
        <td colspan="4" class="pl-0">

            <div class="preloader-block active" data-simplebar style="min-height: 150px; max-height: 400px;">
                <table class="w-100" cellspacing="0" cellpadding="0" border="0">
                    <thead>
                        <tr style="height: 38px;">
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
            </div>
        </td>
    </tr>

@endforeach
