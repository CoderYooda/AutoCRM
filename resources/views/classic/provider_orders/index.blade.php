@extends($request['view_as'] == 'json' && $request['target'] != null ? env('DEFAULT_THEME', 'classic') . '.layouts.TabXHR' : env('DEFAULT_THEME', 'classic') . '.store.layout.tabs')

@section('tab')
    <div class="top-container">
        <div class="search-panel box">
            <div class="search-field-container w-100">
                <input id="search" name="search" placeholder="Поиск по контрагенту" class="input w-100" value="{{ request('search') }}" type="text">
            </div>
            <div class="actions">
                <button onclick="openDialog('providerorderDialog')" class="button primary">Новыая заявка поставщику</button>
            </div>
        </div>
    </div>
    <div id="ajax-table-provider_orders" class="bottom-container">
        <div class="box-lister box">
            <div id="table-container" class="box-content">
                <div id="provider_orders-table" ></div>
            </div>
        </div>
    </div>
@endsection
