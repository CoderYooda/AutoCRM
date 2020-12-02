<button type="button" class="button_back" onclick="store.searchProviderStores();"><i class="fa fa-caret-left" aria-hidden="true"></i> Назад</button>

<h1 class="result_info">
    Поиск по связке: <span id="manufacturer">{{ $request->manufacturer }}</span> & {{ $request->article }}
</h1>

<h3 class="ml-15">Оригинальные запчасти:</h3>

<div class="table">

    <div class="table_header">
        <div class="item pointer" onclick="store.sortBy(this, 'originals', 'rest');">
            <span>Остаток на складе</span>
            <i class="fa fa-caret-up" aria-hidden="true"></i>
        </div>
        <div class="item">Комплектность</div>
        <div class="item pointer" onclick="store.sortBy(this, 'originals', 'days_min');">
            <span>Срок поставки</span>
            <i class="fa fa-caret-up" aria-hidden="true"></i>
        </div>
        <div class="item pointer mw-100" onclick="store.sortBy(this, 'originals', 'price');">
            <span>Цена</span>
            <i class="fa fa-caret-up" aria-hidden="true"></i>
        </div>
        <div class="item">Действия</div>
    </div>

    @include(get_template() . '.provider_stores.includes.table_items', ['type' => 'originals'])

</div>

<h3 class="ml-15">Аналоги:</h3>

<div class="table">

    <div class="table_header">
        <div class="item">Производитель</div>
        <div class="item">Артикул</div>
        <div class="item pointer" onclick="store.sortBy(this, 'analogues', 'rest');">
            <span>Остаток на складе</span>
            <i class="fa fa-caret-up" aria-hidden="true"></i>
        </div>
        <div class="item">Комплектность</div>
        <div class="item pointer" onclick="store.sortBy(this, 'analogues', 'days_min');">
            <span>Срок поставки</span>
            <i class="fa fa-caret-up" aria-hidden="true"></i>
        </div>
        <div class="item pointer mw-100" onclick="store.sortBy(this, 'analogues', 'price');">
            <span>Цена</span>
            <i class="fa fa-caret-up" aria-hidden="true"></i>
        </div>
        <div class="item">Действия</div>
    </div>

    @include(get_template() . '.provider_stores.includes.table_items', ['type' => 'analogues'])

</div>
