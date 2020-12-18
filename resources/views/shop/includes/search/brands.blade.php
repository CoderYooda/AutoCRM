<div class="table">

    <div class="search_header">

        <div class="w-20">Производитель</div>

    </div>

    <div class="search_body">
        @forelse($brands as $brand)

            <div class="brand" onclick="search.showProvidersOffers(this, '{{ $brand }}');">

                <div class="w-20 name">{{ $brand }}</div>

            </div>

        @empty

            <div class="empty_table">
                Результат поиска пуст
            </div>

        @endforelse

    </div>

</div>
