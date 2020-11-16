<div class="tab-pane" id="{{ $class }}_tab_entrances" data-simplebar style="max-height: 400px;">

    @if(isset($product->entrances) && count($product->entrances))
        <table>
            <tr>
                <th>ID</th>
                <th>Поставщик</th>
                <th>Количество</th>
                <th>Дата</th>
            </tr>

            @foreach($product->entrances as $entrance)

                <tr>
                    <td>{{ $entrance->id }}</td>
                    <td>{{ $entrance->partner->official_name ?? '' }}</td>
                    <td>{{ $entrance->pivot->count }}</td>
                    <td>{{ $entrance->pivot->created_at }}</td>
                </tr>

            @endforeach

        </table>
    @else
        Поступления не найдены
    @endif

</div>
