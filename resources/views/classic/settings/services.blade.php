{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? get_template() . '.layouts.TabXHR' : get_template() . '.settings.layout.tabs')

@section('tab')

    <div class="box m-15">

        <div style="margin-bottom: 30px !important;">
            <h1 class="ml-15 service-header-title">Сервисы</h1>
        </div>

        <div class="ml-15 mt-15">
            <ul id="settings_services_tabs" class="nav header_selects_navs">
                <li class="nav-item statistic-filter pr-15">
                    <a href="#" data-target="tab_providerorders" class="button primary w-100 active">Проценка</a>
                </li>
                <li class="nav-item statistic-filter pr-15">
                    <a href="#" data-target="tab_messages" class="button primary w-100">Мессенджеры</a>
                </li>
            </ul>
        </div>

        <div class="tab-content w-100">
            <div id="tab_providerorders" class="tab-pane active">
                <div class="statistic-row row-sm mt-0">

                    @foreach($services as $service)

                        @continue($service->category_id)

                        <div class="statistic-filter pr-15 mb-15">
                            <div class="p-10 d-flex service-box pointer text-center" onclick="settings.toggleProviderOrder(this, {{ $service->id }})" style="min-height: 143px; position: relative; justify-content: center; flex-direction: column;">
                                <div>
                                    <div class="service-title title-elipsed">{{ $service->name }}</div>
                                    <div class="service-url title-elipsed">{{ parse_url($service->url)['host'] }}</div>
                                </div>
                                <div style="position: absolute; bottom: 0; margin-bottom: 10px;">
                                    <label class="ui-switch float-left">
                                        <input id="service_{{ $service->id }}" onclick="event.preventDefault();" class="d-none" type="checkbox" @if($company->isServiceProviderActive($service->id)) checked @endif><i></i>
                                    </label>
                                </div>
                            </div>
                        </div>

                    @endforeach

                </div>
            </div>

            <div id="tab_messages" class="tab-pane">
                123
            </div>

        </div>

    </div>

@endsection
