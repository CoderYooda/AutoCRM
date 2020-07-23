{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? get_template() . '.layouts.TabXHR' : get_template() . '.settings.layout.tabs')

@section('tab')


    <div id="ajax-table-services" style="margin: 15px 15px 15px 0;">
        <div class="box ml-15">
            <div class="modal-header tab-container">
                <ul id="settings_services_tabs" class="nav header_selects_navs">
                    <li class="nav-item active">
                        <a href="#tab_providerorders" class="button primary">Проценка</a>
                    </li>
                    <li class="nav-item ml-10">
                        <a href="#tab_messages" class="button primary">Мессенджеры</a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="tab-content">
            <div id="tab_providerorders" class="tab-pane">
                <div class="d-flex">
                    <div class="row row-sm">

                        @foreach($services as $service)

                            @continue($service->category_id != 0)

                            <div class="col-sm-3 pr-0 mb-15">
                                <div class="p-10 box pointer text-center" onclick="settings.toggleProviderOrder(this, {{ $service->id }})" style="min-height: 200px;">
                                    <div>
                                        <img style="max-width: 80%; height: 150px;" src="{{ asset('/images/logotypes/' . $service->img) }}">
                                    </div>
                                    <div>
                                        <label class="ui-switch float-right mt-5">
                                            <input id="service_{{ $service->id }}" onclick="event.preventDefault();" class="d-none" type="checkbox" @if($company->isServiceProviderActive($service->id)) checked @endif><i></i>
                                        </label>
                                    </div>
                                </div>
                            </div>

                        @endforeach

                    </div>
                </div>
            </div>

            <div id="tab_messages" class="tab-pane">
                123
            </div>

        </div>

    </div>

@endsection
