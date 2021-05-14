<div class="head-bar">
    <form action="{{ route('CatalogueVinSearch') }}">
        @csrf
        <input class="input" type="text" name="text" value="{{ request('text') }}" placeholder="VIN номер">
        <button class="button primary ml-15" type="submit">Поиск по VIN</button>
    </form>
</div>
