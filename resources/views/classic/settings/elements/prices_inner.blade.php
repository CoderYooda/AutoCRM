
<div class="m-15 box">
    <div class="p-15">
        <div class="d-flex w-100 relative">
            <h2 class="style_header">Ценообразование</h2>
            <button class="button primary absolute right-0" type="button" onclick="openDialog('priceDialog');">Добавить</button>
        </div>

        <div class="prices d-flex mt-15">

            @forelse($prices as $price)

                <div class="form-group mr-10">
                    <button type="button" onclick="openDialog('priceDialog', '&price_id={{ $price->id }}');">{{ $price->name }}</button>
                </div>

            @empty

                <div class="empty_table">
                    Настройки не найдены
                </div>

            @endforelse
        </div>

    </div>
</div>
