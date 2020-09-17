@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'admin.layouts.tabs')

@section('tab')

    <div id="ajax-table-companies" class="bottom-container" style="height: calc(100% - 79px) !important;">

        <div class="box-lister" style="width: 1px!important;">

            <div class="search-panel box mb-15">
                <div class="search-field-container w-100 d-flex">
                    <input onkeyup="{{ $class }}.searchDebounce();" id="search" name="search" placeholder="Поиск по компаниям" class="input w-100" value="{{ request('search') }}" type="text">
                    <button type="button" onclick="{{ $class }}.searchDebounce();" class="button primary ml-10">Поиск</button>
                </div>
            </div>

            <div class="box h-100">
                <div id="table-container" class="box-content h-100">
                    <div id="companies-table"></div>
                </div>
            </div>
        </div>
    </div>

@endsection
