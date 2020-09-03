

<div id="article_{{ $article->id }}">

    <div class="p-5" style="background: #F7F7F7">

        <span>{{ $article->name }}</span>

        <div class="float-right d-flex">

            <div onclick="{{ $class }}.removeProduct({{ $article->id }})" class="store_arrow_bg pointer mr-10">
                <i class="fa fa-trash fa-5" aria-hidden="true"></i>
            </div>

            <div onclick="{{ $class }}.showEntrances(this, {{ $article->id }})" class="store_arrow_bg pointer">
                <i class="fa fa-angle-down fa-5" aria-hidden="true"></i>
            </div>

        </div>

    </div>

    <div id="product_selected_{{ $article->id }}" class="d-none">

        @if(isset($entrances) && count($entrances))

            <div class="text-center">
                <table cellspacing="0" class="w-100">

                    <thead>
                        <th>Поступление</th>
                        <th>Количество</th>
                    </thead>

                    <tbody>

                        @foreach($entrances as $entrance)

                            <tr>
                                <td>{{ $entrance->entrance_id }}</td>
                                <td class="all-center">
                                    <div style="width: 60px;">
                                        <input type="text" class="form-control text-center" name="products[{{ $entrance->entrance_id }}][{{ $article->id }}]" value="{{ $entrance->count - $entrance->released_count }}" />
                                    </div>
                                </td>
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

    </div>

</div>
