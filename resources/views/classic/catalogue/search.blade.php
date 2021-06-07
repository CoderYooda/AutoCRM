<div class="head-bar">
    <div id="vin_searcher" class="vin_searcher">
        <form onsubmit="window.storecatalogs.getByVin(this, event)" action="{{ route('CatalogueVinSearch') }}">
            @csrf
            <input class="input" type="text" name="text" value="{{ request('text') }}" placeholder="VIN номер">
            <button class="button primary ml-15" type="submit">Поиск по VIN</button>
        </form>
        <div id="vin_dd" class="drop_content hide" style="max-height: 460px;">

        </div>
    </div>
    @php
        use App\Http\Controllers\CatalogueController;
        $favorites = CatalogueController::getFavourites();
    @endphp
    <div id="favour_button" class="favour-block" onclick="window.storecatalogs.toggleFavour()">
        Избранное
        <div class="red_count">{{ $favorites->count() }}</div>
        <div class="favour-ico">

        </div>
        <div id="favour-block" class="drop_content hide" style="min-width: 697px">
            @include(get_template() . '.catalogue.favourites', ['favorites' => $favorites])
        </div>
    </div>
    <div id="search_butt" class="left_shift has_dd">
        <input class="input"  onfocus="window.storecatalogs.searchFocus()" oninput="window.storecatalogs.searchOnPage(this.value)" style="min-width: 200px" type="text" name="search"  placeholder="Поиск по странице">
        <div id="search_dd" class="drop_content hide">
            <ol>
            </ol>
        </div>
    </div>
</div>
