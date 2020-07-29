@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? get_template() . '.layouts.TabXHR' : get_template() . '.store.layout.tabs')

@section('tab')

    <div id="ajax-table-provider_stores" class="bottom-container" style="height: calc(100% - 79px)!important;">
        <div class="box-lister" style="width: 1px!important;">
            <div class="box mb-15">
                <div class="w-100 box-search">
                    <div class="box m-10">
                        <input id="search" name="search" placeholder="Поиск по складам" class="input w-100" value="{{ request('search') }}" type="text">
                        <input type="hidden" name="service_id" value="{{ $services->first()->id }}" />
                        <span class="input-group-append" data-toggle="tooltip" data-placement="top" title="Очистить поиск">
                            <button class="btn_clean" onclick="window.store.cleanSearch()"></button>
                        </span>
                    </div>
                </div>

                <div class="w-100 p-10 pt-0 provider_tabs">
                    @foreach($services as $service)

                        @continue(!auth()->user()->company->isServiceProviderActive($service->id))

                        <button onclick="store.showProvider(this, {{ $service->id }})" class="button primary mr-5 @if($loop->first) active @endif">{{ $service->name }} <span id="service_count_{{ $service->id }}"></span></button>

                    @endforeach
                </div>
            </div>

            <div id="table-container" class="box box-content">
                <div id="provider_stores-table" >

                    <table cellspacing="0" cellpadding="0" border="0" class="w-100 pt-15">

                        <thead>
                            <tr>
                                <th style="color: #2D76A8;">ID</th>
                                <th style="color: #2D76A8;">Производитель</th>
                                <th style="color: #2D76A8;">Артикул</th>
                            </tr>
                        </thead>

                        <tbody id="table_body">

                        </tbody>

                    </table>

                </div>
            </div>
        </div>
    </div>

@endsection
