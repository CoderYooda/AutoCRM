@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? env('DEFAULT_THEME', 'classic') . '.layouts.TabXHR' : env('DEFAULT_THEME', 'classic') . '.settings.layout.tabs')
@section('tab')

    <div class="m-15 box">

        <button onclick="openDialog('storeImportDialog')" class="button primary float-right m-15">Импорт товаров</button>

        <div class="m-15">
            <h2 class="mt-0 mb-0 style_header">Магазины</h2>
            <div id="ajax-table-store" class="d-flex flex p-3 row row-sm">
                @include(env('DEFAULT_THEME', 'classic') . '.settings.elements.store_container')
            </div>
        </div>
    </div>

    <div class="m-15 mt-0" id="ajax-table-imports">
        @include(get_template() . '.settings.elements.import_history', $last_imports)
    </div>

@endsection

