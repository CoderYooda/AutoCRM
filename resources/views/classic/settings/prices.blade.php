@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? get_template() . '.layouts.TabXHR' : 'classic.settings.layout.tabs')

@section('title', $page ?? 'Склад')

@section('tab')

    <div class="m-15 box">
        <div class="m-15">
            <div class="d-flex w-100 relative">
                <h2 class="style_header">Ценообразование</h2>
                <button class="button primary absolute right-0" type="button" onclick="openDialog('priceDialog');">Добавить</button>
            </div>
            <div id="ajax-table-prices">

                <div class="prices">
                    @forelse($prices as $price)

                        <div class="form-group">

                            <label>{{ $price->name }}</label>

                        </div>

                    @empty

                        <div class="empty_table">
                            Настройки не найдены
                        </div>

                    @endforelse
                </div>

            </div>
        </div>
    </div>

@endsection

