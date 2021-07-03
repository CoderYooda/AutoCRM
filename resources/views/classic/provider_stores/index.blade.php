@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? get_template() . '.layouts.TabXHR' : get_template() . '.store.layout.tabs')

@section('tab')

    <div id="ajax-table-provider_stores" class="bottom-container" style="height: calc(100% - 79px)!important;">
        <div class="box-lister" style="width: 1px!important;">
            <div class="box mb-15">
                <div class="w-100 box-search">
                    <div class="d-flex m-10">
                        <form action="#" class="w-100 d-flex" onsubmit="store.searchProviderStores(event)">
                            <input id="search" name="search" placeholder="Поиск по складам" class="input box mr-5 w-100" value="{{ request('search') }}" type="text">
                            <input type="hidden" name="service_key" value="{{ $services->first()->key ?? 0 }}" />
    {{--                        <span class="input-group-append" data-toggle="tooltip" data-placement="top" title="Очистить поиск">--}}
    {{--                            <button class="btn_clean" onclick="window.store.cleanSearch()"></button>--}}
    {{--                        </span>--}}
                            <button type="submit" class="button primary">Найти</button>
                        </form>

                        @can('Создавать заявки поставщикам')
                            @if(count($services))
                                <button class="button green btn_with_badge ml-5 float-right" onclick="store.registerProviderOrder(this)">Корзина</button>
                            @endif
                        @endcan
                    </div>
                </div>

                <div class="w-100 mb-10 pl-10 provider_tabs">

                    @forelse($services as $service)

                        <button data-id="{{ $service->id }}" data-sort="{{ $service->pivot->sort }}" onclick="store.showProvider(this, '{{ $service->key }}')" class="button mr-5 relative primary btn_with_badge @if($loop->first) active @endif">
                            {{ $service->name }} <span id="service_count_{{ $service->key }}" class="badge-pill">0</span>
                        </button>

                    @empty

                        <div class="text-center">
                            У вас нет активных сервисов для проценки, для подключения перейдите в раздел <a class="ajax-nav" href="{{ route('SettingsIndex', ['active_tab' => 'services']) }}">настройки</a>
                        </div>

                    @endforelse

                </div>

            </div>

            <div class="box box-content preloader-block" style="max-height: calc(100% - 105px)!important;">

                <div data-simplebar class="h-100">

                    <div id="table-container">

    {{--                @include(get_template() . '.provider_stores.includes.manufacturers')--}}

    {{--                @include(get_template() . '.provider_stores.includes.warehouses')--}}

                    </div>

                </div>

            </div>

        </div>
    </div>

@endsection
