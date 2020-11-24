@foreach($manufacturers as $manufacturer)

    <tr id="brand_{{ $manufacturer }}" class="pointer" style="height: 40px;" onclick="store.showManufactureStores(this, '{{ $manufacturer }}')">
        <td>{{ $manufacturer }}</td>
        <td>{{ $request->search }}</td>
        <td style="width: 38px;">
            <div class="store_arrow_bg" data-manufacturer="{{ $manufacturer }}">
                <i class="fa fa-angle-down fa-5" aria-hidden="true"></i>
            </div>
        </td>
    </tr>

    <tr class="unhovereable d-none" id="brand_context_{{ $manufacturer }}">
        <td colspan="4" class="pl-0">

            <div class="preloader-block" data-simplebar style="min-height: 150px; max-height: 400px;">
                <table class="w-100" cellspacing="0" cellpadding="0" border="0">
                    <thead>
                        <tr style="height: 38px;">
                            <th></th>
                            <th>Остаток на складе</th>
                            <th>Мин. кол-во для заказа</th>
                            <th class="thead_sortable" onclick="store.sortBy(this, 'days')">Срок поставки <div class="sort_arrow days down"></div></th>
                            <th class="thead_sortable" onclick="store.sortBy(this, 'price')">Цена <div class="sort_arrow price down"></div></th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </td>
    </tr>

@endforeach
