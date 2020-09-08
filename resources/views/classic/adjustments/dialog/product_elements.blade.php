<div class="entrances">
    <div class="children_header d-flex">
        <div class="pl-10" style="width: 40%">Дата</div>
        <div style="width: 30%">Цена</div>
        <div style="width: 20%">Количество</div>
        <div style="width: 10%"></div>
    </div>
    <div class="children_body">

        <div class="children_element d-flex">
            <div class="pl-10" style="width: 40%">28 сентября 2020 в 14:13</div>
            <div style="width: 30%"><input type="text" value="100 000"></div>
            <div style="width: 20%"><input type="text" value="100 000"></div>
            <div style="width: 10%"></div>
        </div>

        <div class="children_button">Добавить корректирующую позицию</div>

    </div>
</div>


{{--<div id="article_{{ $article_id }}" class="element">--}}

{{--    <div class="p-5" style="background: #F7F7F7">--}}

{{--        <span>{{ $articleAttributes['name'] }}</span>--}}

{{--        <div class="float-right d-flex">--}}

{{--            <div onclick="{{ $class }}.removeProduct({{ $article_id }})" class="store_arrow_bg pointer mr-10 @isset($adjustment) d-none @endisset">--}}
{{--                <i class="fa fa-trash fa-5" aria-hidden="true"></i>--}}
{{--            </div>--}}

{{--            <div onclick="{{ $class }}.showEntrances(this, {{ $article_id }})" class="store_arrow_bg pointer toggled">--}}
{{--                <i class="fa fa-angle-down fa-5" aria-hidden="true"></i>--}}
{{--            </div>--}}

{{--        </div>--}}

{{--    </div>--}}

{{--    <div id="product_selected_{{ $article_id }}" class="d-none">--}}

{{--        @if(count($articleAttributes['entrances']))--}}

{{--            <div>--}}
{{--                <table cellspacing="0" class="w-100">--}}

{{--                    <thead>--}}
{{--                        <th>{{ isset($adjustment) ? 'Отклонение' : 'Количество' }}</th>--}}
{{--                        <th>Цена</th>--}}
{{--                        <th>Дата</th>--}}
{{--                    </thead>--}}

{{--                    <tbody>--}}

{{--                        @if(count($articleAttributes['entrances']))--}}

{{--                            @foreach($articleAttributes['entrances'] as $entrance_id => $attributes)--}}

{{--                                <tr>--}}

{{--                                    <td>--}}
{{--                                        @isset($adjustment)--}}
{{--                                            <span>{{ $attributes['deviation_count'] }}</span>--}}
{{--                                        @else--}}
{{--                                            <div style="width: 60px;">--}}
{{--                                                <input type="text" class="form-control text-center" name="products[{{ $entrance_id }}][{{ $article_id }}][count]" value="{{ $attributes['count'] - $attributes['released_count'] }}" />--}}
{{--                                            </div>--}}
{{--                                        @endif--}}
{{--                                    </td>--}}

{{--                                    <td>--}}
{{--                                        @isset($adjustment)--}}
{{--                                            <span>{{ $attributes['deviation_price'] }}</span>--}}
{{--                                        @else--}}
{{--                                            <div style="width: 60px;">--}}
{{--                                                <input type="text" class="form-control text-center" name="products[{{ $entrance_id }}][{{ $article_id }}][price]" value="{{ $attributes['price'] }}" />--}}
{{--                                            </div>--}}
{{--                                        @endif--}}
{{--                                    </td>--}}

{{--                                    <td>--}}
{{--                                        <span>{{ $attributes['created_at'] }}</span>--}}
{{--                                    </td>--}}

{{--                                </tr>--}}

{{--                            @endforeach--}}

{{--                        @endif--}}

{{--                        <tr id="new_correct_{{ $article_id }}" class="d-none">--}}
{{--                            <td>--}}
{{--                                <div style="width: 60px;">--}}
{{--                                    <input type="text" class="form-control text-center" name="products[new][{{ $article_id }}][count]" disabled value="1" />--}}
{{--                                </div>--}}
{{--                            </td>--}}
{{--                            <td class="d-flex">--}}
{{--                                <div style="width: 60px;">--}}
{{--                                    <input type="text" class="form-control text-center" name="products[new][{{ $article_id }}][price]" disabled value="100" />--}}
{{--                                </div>--}}
{{--                                <div onclick="{{ $class }}.removeField(this)" class="store_arrow_bg pointer mr-10">--}}
{{--                                    <i class="fa fa-trash fa-5" aria-hidden="true"></i>--}}
{{--                                </div>--}}
{{--                            </td>--}}
{{--                            <td>--}}
{{--                                <span>{{ date('d.m.Y') }}</span>--}}
{{--                            </td>--}}
{{--                        </tr>--}}

{{--                        <tr>--}}
{{--                            <td colspan="3">--}}
{{--                                <div class="all-center p-10">--}}
{{--                                    <button type="button" class="button primary" onclick="{{ $class }}.addField(this, {{ $article_id }})">Добавить позицию</button>--}}
{{--                                </div>--}}
{{--                            </td>--}}
{{--                        </tr>--}}

{{--                    </tbody>--}}

{{--                </table>--}}
{{--            </div>--}}

{{--        @else--}}

{{--            <div class="all-center flex-column">--}}
{{--                <div class="out_of_search"></div>--}}
{{--                <span>Результат поиска пуст</span>--}}
{{--            </div>--}}

{{--        @endif--}}

{{--    </div>--}}

{{--</div>--}}
