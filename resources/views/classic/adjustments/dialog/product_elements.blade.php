@if(isset($entrances) && count($entrances))
    <div data-simplebar class="text-center" style="height: 300px;">
        <table cellspacing="0" class="w-100">

            <thead>
            <th>Поступление</th>
            <th>Артикул</th>
            <th>Количество</th>
            <th>Реализовано</th>
            </thead>

            <tbody>

            @foreach($entrances as $entrance)

                <tr>
                    <td>{{ $entrance->entrance_id }}</td>
                    <td>{{ $entrance->article_id }}</td>
                    <td class="all-center">
                        <div style="width: 60px;">
                            <input type="text" class="form-control text-center" name="products[]" value="{{ $entrance->count }}" />
                        </div>
                    </td>
                    <td>{{ $entrance->released_count }}</td>
                </tr>

            @endforeach

            </tbody>

        </table>
    </div>

@else

    <div class="all-center flex-column">
        <div class="out_of_search"></div>
        <span>Результат поиска пуст</span>
    </div>

@endif
