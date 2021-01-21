{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.shop.layout.tabs')

@section('title', $page ?? 'Интернет-магазин | Посещаемость')

@section('tab')

    <div id="ajax-shop-traffic" class="bottom-container" style="height: calc(100% - 30px) !important;">

        <div class="box m-15 p-15 w-100">

            <div class="methods">

                <div class="method">

                    <div class="image">
                        <img src="{{ asset('/images/icons/shop-settings/yandex_metric.svg') }}" />
                    </div>

                    <div class="status">
                        <span class="ml-2">
                            <label class="ui-switch orange mt-1">
                                <input class="d-none" onclick="event.preventDefault();" type="checkbox"><i></i>
                            </label>
                        </span>
                    </div>

                </div>

                <div class="method">

                    <div class="image">
                        <img src="{{ asset('/images/icons/shop-settings/google_analytics.svg') }}" />
                    </div>

                    <div class="status">
                        <span class="ml-2">
                            <label class="ui-switch orange mt-1">
                                <input class="d-none" onclick="event.preventDefault();" type="checkbox"><i></i>
                            </label>
                        </span>
                    </div>

                </div>

            </div>

        </div>

    </div>

@endsection

