@if(count($manufacturers))

    <div data-simplebar>

        <div id="provider_stores-table">

            <table cellspacing="0" cellpadding="0" class="w-100 pt-15">

                <thead>
                <tr>
                    <th style="color: #2D76A8;">Производитель</th>
                    <th style="color: #2D76A8;">Артикул</th>
                </tr>
                </thead>

                <tbody id="table_body">

                    @foreach($manufacturers as $manufacturer)

                        <tr id="brand_{{ $manufacturer }}" class="pointer" style="height: 40px;" onclick="store.showManufactureStores(this, '{{ $manufacturer }}')">
                            <td>{{ $manufacturer }}</td>
                            <td>{{ $request->search }}</td>
                        </tr>

                    @endforeach

                </tbody>

            </table>

        </div>

    </div>

@else

    <div class="empty_table">
        <div class="image"></div>
        <div class="text">Результат поиска пуст</div>
    </div>

@endif
