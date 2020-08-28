<div id="chequeDialog" class="dialog" style="width:340px;">
    <div class="titlebar">Печать ценников и этикеток</div>

    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $tag }}')">_</button>
    <button class="btn_close" onclick="window.{{ $tag }}.finitaLaComedia()">×</button>

    <form class="p-15" action="#" method="POST">

        @csrf

{{--        <div class="form-group">--}}
{{--            <label>Цена</label>--}}
{{--            <select name="price_source" class="form-control">--}}
{{--                <option value="retail">Розничная цена</option>--}}
{{--                <option value="fifo-lifo">FIFO/LIFO</option>--}}
{{--            </select>--}}
{{--        </div>--}}

        <div class="form-group">
            <label>Количество каждой позиции</label>
            <div class="d-flex">
                <div class="flex-1 all-center mr-5">
                    <input type="radio" name="count_type" value="0" class="mr-15 pointer" checked />
                    <input type="text" name="count" value="1" class="text-center form-control">
                </div>
                <div class="flex-3 all-center ml-5">
                    <input type="radio" name="count_type" value="1" class="mr-15 pointer" />
                    <div>В соответствии с остатками</div>
                </div>
            </div>

            <div class="text-grey mt-10" style="font-size: 12px;">
                Максимальное количество ценников, которое можно напечатать за раз - 1 000 шт.
            </div>
        </div>

        <div class="form-group">
            <div class="d-flex">

                <div class="flex-1">
                    <label>Вид ценника</label>
                </div>

                <div class="flex-2 ml-15 d-flex flex-column">

                    @foreach($cheque_types as $index => $cheque)

                        <span>
                            <input class="pointer" type="radio" name="cheque_type" @if($loop->first) checked @endif value="{{ $index }}" />
                            <label>{{ $cheque }}</label>
                        </span>

                    @endforeach

                </div>

            </div>
        </div>

        @foreach($products as $product)
            <input type="hidden" name="products[]" value="{{ $product->id }}" />
        @endforeach

        <div class="modal-footer pb-0 pl-0 pr-0">
            <button type="submit" onclick="{{ $tag }}.finitaLaComedia()" class="button white">Закрыть</button>
            <button type="button" onclick="{{ $tag }}.printCheque(this)" class="button primary pull-right">Печать</button>
        </div>

        <div class="system_message">

        </div>
    </form>
</div>
