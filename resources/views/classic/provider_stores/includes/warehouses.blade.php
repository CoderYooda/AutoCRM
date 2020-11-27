<button type="button" class="button_back" onclick="store.searchProviderStores();"><i class="fa fa-caret-left" aria-hidden="true"></i> Назад</button>

<h1 class="result_info">
    Поиск по связке: {{ $request->manufacturer }} & {{ $request->article }}
</h1>

<h3 class="ml-15">Оригинальные запчасти:</h3>

<div class="table">

    @if($originalCount)

        <div class="table_header">
            <div class="item">Остаток на складе</div>
            <div class="item">Мин. кол-во для заказа</div>
            <div class="item">Срок поставки</div>
            <div class="item mw-100">Цена</div>
            <div class="item">Действия</div>
        </div>

        <div data-simplebar class="table_body" style="max-height: 200px;">

            @foreach($stores as $store)

                @continue($store['is_analogue'])

                <div class="table_item" id="{{ $store['index'] }}">
                    <div class="item">{{ $store['rest'] }} шт.</div>
                    <div class="item">{{ $store['packing'] }} шт.</div>
                    <div class="item">{{ $store['delivery'] }}</div>
                    <div class="item mw-100">{{ correct_price($store['price']) }} руб.</div>
                    <div class="item">
                        <div class="add-to-cart @if($store['count'] > 0) d-none @endif" onclick="store.addToCart(this, {{ $store['packing'] }})">
                        </div>
                        <div class="edit-cart-count @if($store['count'] < 1) d-none @endif">
                            <button class="fa fa-minus pci left" onclick="store.decrementArticleCartAmount(this, {{ $store['packing'] }});" aria-hidden="true"></button>
                            <input class="provider-cart-input" type="text" disabled value="{{ $store['packing'] }}" />
                            <button class="fa fa-plus pci right" onclick="store.incrementArticleCartAmount(this, {{ $store['packing'] }});" aria-hidden="true"></button>
                        </div>
                    </div>
                </div>

            @endforeach

        </div>

    @else
        <div class="empty_table">Нет предложений</div>
    @endif

</div>

<h3 class="ml-15">Аналоги:</h3>

<div class="table">

    @if($analogueCount)

        <div class="table_header">
            <div class="item">Производитель</div>
            <div class="item">Артикул</div>
            <div class="item">Остаток на складе</div>
            <div class="item">Мин. кол-во для заказа</div>
            <div class="item">Срок поставки</div>
            <div class="item mw-100">Цена</div>
            <div class="item">Действия</div>
        </div>

        <div data-simplebar class="table_body" style="max-height: 200px;">

            @foreach($stores as $store)

                @continue(!$store['is_analogue'])

                <div class="table_item" id="{{ $store['index'] }}">
                    <div class="item">{{ $store['manufacturer'] }}</div>
                    <div class="item">{{ $store['article'] }}</div>
                    <div class="item">{{ $store['rest'] }} шт.</div>
                    <div class="item">{{ $store['packing'] }} шт.</div>
                    <div class="item">{{ $store['delivery'] }}</div>
                    <div class="item mw-100">{{ correct_price($store['price']) }} руб.</div>
                    <div class="item">
                        <div class="add-to-cart @if($store['count'] > 0) d-none @endif" onclick="store.addToCart(this, {{ $store['packing'] }})">
                        </div>
                        <div class="edit-cart-count @if($store['count'] < 1) d-none @endif">
                            <button class="fa fa-minus pci left" onclick="store.decrementArticleCartAmount(this, {{ $store['packing'] }});" aria-hidden="true"></button>
                            <input class="provider-cart-input" type="text" disabled value="{{ $store['packing'] }}" />
                            <button class="fa fa-plus pci right" onclick="store.incrementArticleCartAmount(this, {{ $store['packing'] }});" aria-hidden="true"></button>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

    @else
        <div class="empty_table">Нет предложений</div>
    @endif
</div>
