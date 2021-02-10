<div class="box-lister" style="width: 1px!important;">
    <div class="w-100 mb-15">
        <input id="search" name="search" placeholder="Поиск" class="input w-100" value="{{ request('search') }}" type="text">
        <span class="input-group-append" data-toggle="tooltip" data-placement="top" title="Очистить поиск">
            <button class="btn_clean" onclick="window.store.cleanSearch()"></button>
        </span>
    </div>
    <div id="table-container" class="box box-content">
        <div data-data="{{ $data }}" id="{{ request('active_tab') }}Table"></div>
    </div>
</div>
