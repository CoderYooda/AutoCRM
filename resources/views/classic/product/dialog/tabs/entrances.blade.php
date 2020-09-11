<div class="tab-pane" id="{{ $class }}_tab_entrances" data-simplebar style="height: 400px;">

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
                    <td>{{ $entrance->partner->official_name }}</td>
                    <td>{{ $entrance->articles->find($product->id)->pivot->count }}</td>
                    <td>{{ $entrance->articles->find($product->id)->pivot->created_at }}</td>
                </tr>

            @endforeach

        </table>
    @else
        Поступления не найдены
    @endif

</div>
