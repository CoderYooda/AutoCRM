 @if(count($manufacturers))

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

                @foreach($manufacturers as $info)

                    <tr id="brand_{{ $info['brand'] }}" class="pointer" style="height: 40px;" onclick="store.showManufactureStores(this, '{{ $info['brand'] }}', '{{ $info['searchArticle'] ?? $info['article'] }}')">
                        <td>{{ $info['desc'] }}</td>
                        <td>{{ $info['brand'] }}</td>
                        <td>{{ $info['article'] }}</td>
                    </tr>

                @endforeach

            </tbody>

        </table>

    </div>


@else

    <div class="empty_table">
        <div class="image"></div>
        <div class="text">Результат поиска пуст</div>
    </div>

@endif
