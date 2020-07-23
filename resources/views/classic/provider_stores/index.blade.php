@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? get_template() . '.layouts.TabXHR' : get_template() . '.store.layout.tabs')

@section('tab')

    <div id="ajax-table-provider_stores" class="bottom-container" style="height: calc(100% - 79px)!important;">
        <div class="box-lister" style="width: 1px!important;">
            <div class="w-100 box box-search mb-15">
                <input id="search" name="search" placeholder="Поиск по складам" class="input w-100" value="{{ request('search') }}" type="text">
                <span class="input-group-append" data-toggle="tooltip" data-placement="top" title="Очистить поиск">
                    <button class="btn_clean" onclick="window.store.cleanSearch()"></button>
                </span>
            </div>

            <div class="box w-100 mb-15 p-5">
                @foreach($services as $service)

                    <button class="button primary mr-5 @if($loop->first) active @endif">{{ $service->name }}</button>

                @endforeach
            </div>

            <div id="table-container" class="box box-content">
                <div id="provider_stores-table" ></div>
            </div>
        </div>
    </div>

@endsection
