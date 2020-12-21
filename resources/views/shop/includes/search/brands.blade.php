<div class="table">

    <div class="search_header">

        <div class="w-20">Производитель</div>

    </div>

    <div class="search_body">
        @foreach($brands as $brand)

            <div class="brand" onclick="search.showProvidersOffers(this, '{{ $brand }}');">

                <div class="w-20 name">{{ $brand }}</div>

            </div>

        @endforeach

    </div>

</div>
