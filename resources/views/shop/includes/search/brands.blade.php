<div class="title">
    <h2>Результаты поиска</h2>
</div>

<div class="table">

    <div class="search_header">

        <div class="w-60">Наименование</div>
        <div class="w-20">Производитель</div>
        <div class="w-20">Артикул</div>

    </div>

    <div class="search_body">
        @forelse($brands as $info)

            <div class="brand" onclick="search.showProvidersOffers(
                this,
                '{{ $info['brand'] }}',
                '{{$info['article'] }}',
                '{{$info['searchArticle'] ?? null}}'
                );">

                <div class="w-60 name">{{ $info['desc'] }}</div>
                <div class="w-20 name">{{ $info['brand'] }}</div>
                <div class="w-20 name">{{ $info['article'] }}</div>

            </div>

        @empty

            <div class="empty_table">
                Результат поиска пуст
            </div>

        @endforelse

    </div>

</div>