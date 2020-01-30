@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? env('DEFAULT_THEME', 'classic') . '.layouts.TabXHR' : env('DEFAULT_THEME', 'classic') . '.cash.layout.tabs')

@section('tab')
    <div class="top-container">
        <div class="search-panel box">
            <div class="search-field-container w-100">
                <input id="search" name="search" placeholder="Поиск по контрагенту" class="input w-100" value="{{ request('search') }}" type="text">
            </div>
            <div class="actions">
                <button onclick="openDialog('warrantDialog', '&isIncoming=1')" class="button primary mr-12">Новый приходный ордер</button>
                <button onclick="openDialog('warrantDialog', '&isIncoming=0')" class="button primary">Новый расходный ордер</button>
            </div>
        </div>
    </div>
    <div id="ajax-table-warrant" class="bottom-container">
        @include(env('DEFAULT_THEME', 'classic') . '.warrant.elements.table_container')
    </div>
@endsection

