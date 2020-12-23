@if(count($manufacturers))

    <div data-simplebar style="max-height: calc(100% - 20px);">

        <div id="provider_stores-table">

            <table cellspacing="0" cellpadding="0" class="w-100 pt-15">

                <thead>
                <tr>
                    <th style="color: #2D76A8;">Название</th>
                    <th style="color: #2D76A8;">Производитель</th>
                    <th style="color: #2D76A8;">Артикул</th>
                </tr>
                </thead>

                <tbody id="table_body">

                    @foreach($manufacturers as $manufacturer => $info)

                        <tr id="brand_{{ $manufacturer }}" class="pointer" style="height: 40px;" onclick="store.showManufactureStores(this, '{{ $manufacturer }}')">
                            <td>{{ $info['desc'] }}</td>
                            <td>{{ $manufacturer }}</td>
                            <td>{{ $info['article'] }}</td>
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
